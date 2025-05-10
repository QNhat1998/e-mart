'use client';
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { Product } from '@/sanity.types';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import PriceFormatter from './price-formatter';
import { Button } from './ui/button';
import useCartStore from '@/store';
import QuantityButtons from './quantity-button';
import { cn } from '@/lib/utils';

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  product: Product;
  className?: string;
}

/**
 * AddToCartButton Component
 * Component nút thêm vào giỏ hàng với các tính năng:
 * - Thêm sản phẩm vào giỏ hàng
 * - Hiển thị số lượng và tổng tiền
 * - Kiểm tra tồn kho
 * - Hiển thị thông báo khi thêm sản phẩm
 *
 * Add to cart button component with features:
 * - Add product to cart
 * - Display quantity and subtotal
 * - Stock checking
 * - Show notifications on add
 */
const AddToCartButton = ({ product, className }: Props) => {
  // Lấy các hàm và state từ cart store
  // Get functions and state from cart store
  const { addItem, getItemCount } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  // Effect để xử lý hydration
  // Effect to handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Không render gì nếu chưa hydrate
  // Don't render anything if not hydrated
  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        // Hiển thị khi đã có sản phẩm trong giỏ
        // Display when product is in cart
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter amount={product?.price ? product.price * itemCount : 0} />
          </div>
        </div>
      ) : (
        // Nút thêm vào giỏ hàng
        // Add to cart button
        <Button
          onClick={() => {
            addItem(product);
            toast.success(`${product?.name?.substring(0, 12)}... added successfully!`);
          }}
          disabled={isOutOfStock}
          className={cn(
            'w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white cursor-pointer hoverEffect',
            className
          )}
        >
          Thêm vào giỏ hàng
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
