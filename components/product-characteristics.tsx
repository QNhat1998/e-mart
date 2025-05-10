'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { Product } from '@/sanity.types'; // Type definition cho Product
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'; // UI components cho accordion

/**
 * ProductCharacteristics Component
 * Component hiển thị thông tin chi tiết của sản phẩm dưới dạng accordion với các tính năng:
 * - Hiển thị thông tin cơ bản của sản phẩm
 * - Có thể mở/đóng để xem thông tin
 * - Responsive design
 * - Dễ dàng mở rộng thêm thông tin
 *
 * Displays product details in an accordion format with features:
 * - Show basic product information
 * - Expandable/collapsible information
 * - Responsive design
 * - Easily extensible for more information
 */
const ProductCharacteristics = ({ product }: { product: Product }) => {
  return (
    // Accordion container - Container chính
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        {/* Tiêu đề accordion - Accordion title */}
        <AccordionTrigger className="font-bold">{product?.name}: Characteristics</AccordionTrigger>

        {/* Nội dung accordion - Accordion content */}
        <AccordionContent className="flex flex-col gap-1">
          {/* Thông tin thương hiệu - Brand information */}
          <p className="flex items-center justify-between">
            Brand: <span className="font-semibold tracking-wide">Unknown</span>
          </p>

          {/* Thông tin bộ sưu tập - Collection information */}
          <p className="flex items-center justify-between">
            Collection: <span className="font-semibold tracking-wide">2024</span>
          </p>

          {/* Thông tin loại sản phẩm - Product type information */}
          <p className="flex items-center justify-between">
            Type: <span className="font-semibold tracking-wide">{product?.variant}</span>
          </p>

          {/* Thông tin tồn kho - Stock information */}
          <p className="flex items-center justify-between">
            Stock:{' '}
            <span className="font-semibold tracking-wide">
              {product?.stock ? 'Available' : 'Out of Stock'}
            </span>
          </p>

          {/* Thông tin biến thể - Variant information */}
          <p className="flex items-center justify-between">
            Variant: <span className="font-semibold tracking-wide">{product?.intro}</span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
