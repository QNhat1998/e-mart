'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { twMerge } from 'tailwind-merge'; // Utility function để merge Tailwind classes
import PriceFormatter from './price-formatter'; // Component format giá tiền

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  price: number | undefined; // Giá gốc của sản phẩm
  discount: number | undefined; // Phần trăm giảm giá
  className?: string; // Optional className for custom styling
}

/**
 * PriceView Component
 * Component hiển thị giá sản phẩm với các tính năng:
 * - Hiển thị giá sau khi giảm giá
 * - Hiển thị giá gốc (gạch ngang) khi có giảm giá
 * - Custom styling thông qua className
 * - Responsive design
 *
 * Price display component with features:
 * - Display discounted price
 * - Display original price (strikethrough) when discounted
 * - Custom styling via className
 * - Responsive design
 */
const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        {/* Giá sau khi giảm giá - Discounted price */}
        <PriceFormatter amount={price} className={className} />

        {/* Giá gốc (gạch ngang) khi có giảm giá - Original price (strikethrough) when discounted */}
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className={twMerge('line-through text-xs font-medium text-zinc-500', className)}
          />
        )}
      </div>
    </div>
  );
};

export default PriceView;
