'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { CATEGORIES_QUERYResult, Product } from '@/sanity.types'; // Types cho Sanity data
import { Button } from './ui/button'; // UI Button component
import { useEffect, useState } from 'react'; // React hooks
import { client } from '@/sanity/lib/client'; // Sanity client
import { motion, AnimatePresence } from 'motion/react'; // Animation components
import { Loader2 } from 'lucide-react'; // Loading icon
import ProductCard from './product-card'; // Product card component
import NoProductAvailable from './no-products'; // No products message component

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  categories: CATEGORIES_QUERYResult; // Danh sách danh mục
  slug: string; // Slug của danh mục hiện tại
}

/**
 * CategoryProducts Component
 * Component hiển thị sản phẩm theo danh mục với các tính năng:
 * - Danh sách danh mục có thể chọn
 * - Hiển thị sản phẩm theo danh mục
 * - Loading state
 * - Animation khi chuyển danh mục
 * - Responsive grid layout
 *
 * Category products display component with features:
 * - Selectable category list
 * - Products display by category
 * - Loading state
 * - Category change animations
 * - Responsive grid layout
 */
const CategoryProducts = ({ categories, slug }: Props) => {
  // State management
  const [currentSlug, setCurrentSlug] = useState(slug); // Danh mục đang được chọn
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Function để fetch sản phẩm theo danh mục
  // Function to fetch products by category
  const fetchProducts = async (categorySlug: string) => {
    try {
      setLoading(true);
      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
      `;

      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect để fetch sản phẩm khi danh mục thay đổi
  // Effect to fetch products when category changes
  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      {/* Danh sách danh mục - Category list */}
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map(item => (
          <Button
            key={item?._id}
            onClick={() => setCurrentSlug(item?.slug?.current as string)}
            className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${
              item?.slug?.current === currentSlug && 'bg-darkColor text-white border-darkColor'
            }`}
          >
            {item?.title}
          </Button>
        ))}
      </div>

      {/* Grid sản phẩm - Products grid */}
      <div className="w-full">
        {loading ? (
          // Loading state
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
            <motion.div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </motion.div>
          </div>
        ) : products?.length ? (
          // Hiển thị sản phẩm - Display products
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            <>
              {products?.map((product: Product) => (
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
          // Không có sản phẩm - No products
          <NoProductAvailable selectedTab={currentSlug} className="mt-0 w-full" />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
