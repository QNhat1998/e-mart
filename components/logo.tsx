'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { cn } from '@/lib/utils'; // Utility function để merge Tailwind classes
import Link from 'next/link'; // Next.js Link component
import React from 'react'; // React

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  children: React.ReactNode; // Nội dung logo
  className?: string; // Optional className for custom styling
}

/**
 * Logo Component
 * Component hiển thị logo của website với các tính năng:
 * - Link về trang chủ
 * - Custom styling thông qua className
 * - Responsive design
 *
 * Website logo component with features:
 * - Homepage link
 * - Custom styling via className
 * - Responsive design
 */
const Logo = ({ children, className }: Props) => {
  return (
    <Link href={'/'}>
      <h2 className={cn('text-2xl text-darkColor font-black tracking-wider uppercase', className)}>
        {children}
      </h2>
    </Link>
  );
};

export default Logo;
