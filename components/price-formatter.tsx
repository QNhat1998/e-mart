'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { twMerge } from 'tailwind-merge'; // Utility function để merge Tailwind classes

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  amount: number | undefined; // Số tiền cần format
  className?: string; // Optional className for custom styling
}

/**
 * PriceFormatter Component
 * Component format giá tiền với các tính năng:
 * - Format số tiền theo định dạng USD
 * - Custom styling thông qua className
 * - Responsive design
 *
 * Price formatting component with features:
 * - Format amount in USD format
 * - Custom styling via className
 * - Responsive design
 */
const PriceFormatter = ({ amount, className }: Props) => {
  // Format số tiền theo định dạng USD
  // Format amount in USD format
  const formattedPrice = new Number(amount).toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 2,
  });

  return (
    <span className={twMerge('text-sm font-semibold text-darkColor', className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
