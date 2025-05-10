'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { Product } from '@/sanity.types'; // Type cho sản phẩm từ Sanity
import { urlFor } from '@/sanity/lib/image'; // Utility function để xử lý ảnh từ Sanity
import Image from 'next/image'; // Next.js Image component
import React from 'react';
import PriceView from './price-view'; // Component hiển thị giá
import Link from 'next/link'; // Next.js Link component
import AddToCartButton from './add-cart-button'; // Component nút thêm vào giỏ hàng
import Title from './title'; // Component tiêu đề

/**
 * ProductCard Component
 * Component hiển thị thông tin sản phẩm với các tính năng:
 * - Hình ảnh sản phẩm với hiệu ứng hover
 * - Tên và mô tả sản phẩm
 * - Giá và giảm giá
 * - Nút thêm vào giỏ hàng
 * - Link đến trang chi tiết sản phẩm
 * - Responsive design
 *
 * Product card component with features:
 * - Product image with hover effect
 * - Product name and description
 * - Price and discount
 * - Add to cart button
 * - Link to product detail page
 * - Responsive design
 */
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="rounded-lg overflow-hidden group text-sm">
      {/* Container hình ảnh sản phẩm - Product image container */}
      <div className="overflow-hidden relative bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={500}
              // loading="lazy"
              priority
              className={`w-full h-72 object-contain overflow-hidden  transition-transform duration-500 ${product?.stock !== 0 && 'group-hover:scale-105'}`}
            />
          </Link>
        )}
      </div>

      {/* Container thông tin sản phẩm - Product info container */}
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-md rounded-tl-none rounded-tr-none">
        <Title className="text-base line-clamp-1">{product?.name}</Title>
        <p>{product?.intro}</p>
        <PriceView price={product?.price} discount={product?.discount} className="text-lg" />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
