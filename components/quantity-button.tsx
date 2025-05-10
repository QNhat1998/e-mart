'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import React from 'react';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import useCartStore from '@/store';
import { Product } from '@/sanity.types';
import { twMerge } from 'tailwind-merge';

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  product: Product;
  className?: string;
  borderStyle?: string;
}

/**
 * QuantityButtons Component
 * Component điều khiển số lượng sản phẩm trong giỏ hàng với các tính năng:
 * - Tăng/giảm số lượng sản phẩm
 * - Hiển thị thông báo khi thay đổi số lượng
 * - Kiểm tra tồn kho
 * - Disable nút khi hết hàng hoặc số lượng = 0
 *
 * Controls product quantity in shopping cart with features:
 * - Increase/decrease product quantity
 * - Show notifications on quantity changes
 * - Stock checking
 * - Disable buttons when out of stock or quantity = 0
 */
const QuantityButtons = ({ product, className, borderStyle }: Props) => {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  /**
   * Hàm xử lý giảm số lượng sản phẩm
   * Function to handle decreasing product quantity
   * - Xóa sản phẩm khỏi giỏ hàng
   * - Hiển thị thông báo phù hợp
   * - Remove product from cart
   * - Show appropriate notification
   */
  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success('Quantity Decreased successfully!');
    } else {
      toast.success(`${product?.name?.substring(0, 12)} removed successfully!`);
    }
  };

  return (
    <div className={twMerge('flex items-center gap-1 pb-1 text-base', borderStyle, className)}>
      {/* Nút giảm số lượng - Decrease quantity button */}
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6 cursor-pointer"
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
      >
        <Minus />
      </Button>

      {/* Hiển thị số lượng - Display quantity */}
      <span className="font-semibold w-8 text-center text-darkColor">{itemCount}</span>

      {/* Nút tăng số lượng - Increase quantity button */}
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6 cursor-pointer"
        onClick={() => {
          addItem(product);
          toast.success('Quantity increased successfully!');
        }}
        disabled={isOutOfStock}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
