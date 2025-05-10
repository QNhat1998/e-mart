'use client';
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import useCartStore from '@/store';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

/**
 * CartIcon Component
 * Component hiển thị icon giỏ hàng với các tính năng:
 * - Hiển thị số lượng sản phẩm trong giỏ
 * - Link đến trang giỏ hàng
 * - Hover effect
 *
 * Cart icon component with features:
 * - Display number of items in cart
 * - Link to cart page
 * - Hover effect
 */
const CartIcon = () => {
  const { items } = useCartStore();

  return (
    <Link href={'/cart'} className="group relative">
      {/* Icon giỏ hàng - Shopping bag icon */}
      <ShoppingBag className="w-5 h-5 group-hover:text-darkColor hoverEffect" />

      {/* Badge hiển thị số lượng - Quantity badge */}
      <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;
