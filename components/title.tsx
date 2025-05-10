'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import React from 'react';
import { twMerge } from 'tailwind-merge'; // Utility function để merge Tailwind classes

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  children: React.ReactNode; // Nội dung của tiêu đề
  className?: string; // Optional className for custom styling
}

/**
 * Title Component
 * Component hiển thị tiêu đề với các tính năng:
 * - Custom styling thông qua className
 * - Responsive design
 * - Font size và weight mặc định
 *
 * Title component with features:
 * - Custom styling via className
 * - Responsive design
 * - Default font size and weight
 */
const Title = ({ children, className }: Props) => {
  return <h2 className={twMerge('text-2xl font-semibold', className)}>{children}</h2>;
};

export default Title;
