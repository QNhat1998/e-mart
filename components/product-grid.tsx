'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { PRODUCTS_QUERYResult } from '@/sanity.types'; // Type definition cho kết quả query
import React, { useEffect, useState } from 'react';
import ProductCard from './product-card'; // Component hiển thị thẻ sản phẩm
import { motion, AnimatePresence } from 'motion/react'; // Animation components
import { client } from '@/sanity/lib/client'; // Sanity client để query data
import Tabbar from './tab-bar'; // Component thanh tab
import { productType } from '@/lib/constants'; // Constants cho loại sản phẩm
import NoProductAvailable from './no-products'; // Component hiển thị khi không có sản phẩm
import { Loader2 } from 'lucide-react'; // Icon loading

/**
 * ProductGrid Component
 * Component hiển thị lưới sản phẩm với các tính năng:
 * - Phân loại sản phẩm theo tab
 * - Animation khi thay đổi sản phẩm
 * - Loading state
 * - Responsive grid layout
 * - Xử lý trường hợp không có sản phẩm
 *
 * Displays product grid with features:
 * - Product categorization by tabs
 * - Animations on product changes
 * - Loading state
 * - Responsive grid layout
 * - Handle no products case
 */
const ProductGrid = () => {
  // State Management - Quản lý trạng thái
  const [products, setProducts] = useState<PRODUCTS_QUERYResult>([]); // Danh sách sản phẩm - Product list
  const [loading, setLoading] = useState(false); // Trạng thái loading - Loading state
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || ''); // Tab được chọn - Selected tab

  // Query và params cho Sanity
  // Query and params for Sanity
  const query = `*[_type == "product" && variant == $variant] | order(name asc)`;
  const params = { variant: selectedTab.toLowerCase() };

  /**
   * Effect để fetch data khi tab thay đổi
   * Effect to fetch data when tab changes
   * - Fetch sản phẩm từ Sanity
   * - Xử lý loading state
   * - Xử lý lỗi
   * - Fetch products from Sanity
   * - Handle loading state
   * - Handle errors
   */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(await response);
      } catch (error) {
        console.log('Product fetching Error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    // Container chính - Main container
    <div className="mt-10 flex flex-col items-center">
      {/* Tab bar để chọn loại sản phẩm - Tab bar for product type selection */}
      <Tabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading ? (
        // Loading state - Trạng thái đang tải
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Product is loading...</span>
          </motion.div>
        </div>
      ) : products?.length ? (
        // Grid hiển thị sản phẩm - Product display grid
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          <>
            {products?.map(product => (
              // Animation wrapper cho mỗi sản phẩm
              // Animation wrapper for each product
              <AnimatePresence key={product?._id}>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard key={product?._id} product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </>
        </div>
      ) : (
        // Hiển thị khi không có sản phẩm - Display when no products
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
