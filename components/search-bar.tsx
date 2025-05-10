'use client';
// Specifies this is a client component in Next.js

/**
 * CÁCH HOẠT ĐỘNG CỦA SEARCHBAR COMPONENT
 * HOW SEARCHBAR COMPONENT WORKS
 *
 * 1. Khởi tạo và State Management (Initialization and State Management):
 *    - search: Lưu từ khóa tìm kiếm
 *    - products: Lưu kết quả tìm kiếm
 *    - loading: Trạng thái loading
 *    - showSearch: Điều khiển hiển thị dialog
 *
 * 2. Luồng hoạt động (Flow of Operation):
 *    a. Mở Search Dialog:
 *       - Click vào icon Search -> setShowSearch(true)
 *       - Dialog hiển thị với form tìm kiếm
 *
 *    b. Nhập từ khóa:
 *       - Người dùng nhập -> setSearch(value)
 *       - Kích hoạt useEffect với debounce
 *
 *    c. Debounce và Fetch:
 *       - Đợi 300ms sau khi ngừng gõ
 *       - Tránh gọi API quá nhiều
 *       - Tối ưu performance
 *
 *    d. Tìm kiếm sản phẩm:
 *       - Gọi API Sanity
 *       - Hiển thị loading
 *       - Cập nhật kết quả
 *
 * 3. Hiển thị kết quả (Display Results):
 *    a. Loading State:
 *       - Hiển thị spinner
 *       - Thông báo đang tìm kiếm
 *
 *    b. Product Display:
 *       - Hình ảnh sản phẩm
 *       - Tên và mô tả
 *       - Giá và nút thêm vào giỏ
 *
 * 4. Tính năng bổ sung (Additional Features):
 *    a. Xóa từ khóa:
 *       - Nút X xuất hiện khi có từ khóa
 *       - Click để xóa và reset
 *
 *    b. Đóng Dialog:
 *       - Click outside hoặc nút đóng
 *       - setShowSearch(false)
 *
 *    c. Responsive Design:
 *       - Layout thích ứng
 *       - Image size thay đổi
 *
 * 5. Tối ưu Performance:
 *    - Debounce search input
 *    - Lazy loading images
 *    - Cleanup timers
 *    - Memoized callbacks
 */

// Import các dependencies cần thiết
// Import necessary dependencies
import { Loader2, Search, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { client } from '@/sanity/lib/client';
import { Input } from './ui/input';
import AddToCartButton from './add-cart-button';
import { urlFor } from '@/sanity/lib/image';
import { Product } from '@/sanity.types';
import PriceView from './price-view';
import Image from 'next/image';
import Link from 'next/link';

/**
 * SearchBar Component
 * Component tìm kiếm sản phẩm với các tính năng:
 * - Tìm kiếm realtime
 * - Debounce để tối ưu performance
 * - Hiển thị kết quả tìm kiếm
 * - Thêm sản phẩm vào giỏ hàng
 */
const SearchBar = () => {
  // State Management - Quản lý trạng thái
  const [search, setSearch] = useState(''); // Lưu giá trị input search - Store search input value
  const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm tìm được - Store search results
  const [loading, setLoading] = useState(false); // Trạng thái loading khi search - Loading state during search
  const [showSearch, setShowSearch] = useState(false); // Điều khiển việc hiển thị/ẩn dialog search - Control search dialog visibility

  /**
   * Hàm fetch sản phẩm từ Sanity dựa trên từ khóa tìm kiếm
   * Function to fetch products from Sanity based on search keyword
   * @returns {Promise<void>}
   */
  const fetchProducts = useCallback(async () => {
    // Nếu không có từ khóa tìm kiếm, reset danh sách sản phẩm
    // If no search keyword, reset products list
    if (!search) {
      setProducts([]);
      return;
    }

    setLoading(true); // Bắt đầu loading - Start loading
    try {
      // Query Sanity để tìm sản phẩm có tên match với từ khóa
      // Query Sanity to find products matching the search keyword
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = { search: `${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Kết thúc loading - End loading
    }
  }, [search]);

  /**
   * Debounce input changes để giảm số lần gọi API
   * Debounce input changes to reduce API calls
   */
  useEffect(() => {
    // Đợi 300ms sau khi người dùng ngừng gõ trước khi gọi API
    // Wait 300ms after user stops typing before calling API
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    // Cleanup timer khi component unmount hoặc search thay đổi
    // Cleanup timer when component unmounts or search changes
    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      {/* Dialog Trigger - Nút mở search dialog */}
      <DialogTrigger
        onClick={() => setShowSearch(!showSearch)}
        className="flex items-center hover:cursor-pointer"
      >
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
      </DialogTrigger>

      {/* Dialog Content - Nội dung chính của search */}
      <DialogContent className="max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden bg-white">
        <DialogHeader>
          <DialogTitle className="mb-3">Product Searchbar</DialogTitle>
          {/* Search Form - Form tìm kiếm */}
          <form className="relative" onSubmit={e => e.preventDefault()}>
            <Input
              placeholder="Search your product here..."
              className="flex-1 rounded-md py-5 font-semibold"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {/* Clear search button - Nút xóa từ khóa */}
            {search && (
              <X
                onClick={() => setSearch('')}
                className="w-4 h-4 absolute top-3 right-11 hover:text-red-600 hoverEffect"
              />
            )}
            <button
              type="submit"
              className="absolute right-0 top-0 bg-darkColor/10 w-10 h-full flex items-center justify-center rounded-tr-md hover:bg-darkColor hover:text-white hoverEffect"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>

        {/* Search Results Container - Container kết quả tìm kiếm */}
        <div className="w-full h-full overflow-y-scroll border border-darkColor/20 rounded-md bg-white">
          <div className="">
            {loading ? (
              // Loading state - Trạng thái đang tải
              <p className="flex items-center px-6 gap-1 py-10 text-center text-green-600 font-semibold">
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching on progress...
              </p>
            ) : products?.length ? (
              // Display search results - Hiển thị kết quả tìm kiếm
              products.map((product: Product) => (
                <div key={product?._id} className="bg-white overflow-hidden border-b">
                  {/* Product card layout - Layout thẻ sản phẩm */}
                  <div className="flex items-center p-1">
                    {/* Product image with link to detail page - Hình ảnh sản phẩm với link đến trang chi tiết */}
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      onClick={() => setShowSearch(false)}
                      className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 border border-darkColor/20 rounded-md overflow-hidden group"
                    >
                      {product?.images && (
                        <Image
                          width={200}
                          height={200}
                          src={urlFor(product?.images[0]).url()}
                          alt={'productImage'}
                          className="object-cover w-full h-full group-hover:scale-110 hoverEffect"
                        />
                      )}
                    </Link>
                    {/* Product details section - Phần chi tiết sản phẩm */}
                    <div className="px-4 py-2 flex-grow">
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${product?.slug?.current}`}
                          onClick={() => setShowSearch(false)}
                        >
                          <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-1">{product?.intro}</p>
                        </Link>
                        <PriceView
                          price={product?.price}
                          discount={product?.discount}
                          className="md:text-lg"
                        />
                      </div>
                      {/* Add to cart button - Nút thêm vào giỏ hàng */}
                      <div className="w-60 mt-1">
                        <AddToCartButton product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No results state - Trạng thái không có kết quả
              <div className="text-center py-10 font-semibold tracking-wide">
                {search && products?.length ? (
                  <p>
                    Nothing match with the keyword{' '}
                    <span className="underline text-red-600">{search}</span>. Please try something
                    else.
                  </p>
                ) : (
                  <p className="text-green-600 flex items-center justify-center gap-1">
                    <Search className="w-5 h-5" />
                    Search and explore your products from E-mart.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
