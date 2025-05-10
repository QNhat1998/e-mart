'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { X } from 'lucide-react'; // Icon cho nút đóng
import { usePathname } from 'next/navigation'; // Hook để lấy đường dẫn hiện tại
import React from 'react';
import { motion } from 'motion/react'; // Animation library
import Logo from './logo'; // Component logo
import Link from 'next/link'; // Next.js Link component
import { useOutsideClick } from '@/hooks/use-outside-click'; // Custom hook để xử lý click bên ngoài
import SocialMedia from './social-media'; // Component social media
import { CATEGORIES_QUERYResult } from '@/sanity.types'; // Types cho Sanity data

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface SidebarProps {
  isOpen: boolean; // Trạng thái mở/đóng của sidebar
  onClose: () => void; // Function để đóng sidebar
  categories: CATEGORIES_QUERYResult; // Danh sách danh mục
}

/**
 * Sidebar Component
 * Component hiển thị sidebar với các tính năng:
 * - Animation khi mở/đóng
 * - Danh sách danh mục
 * - Link đến các trang
 * - Social media links
 * - Responsive design
 *
 * Sidebar component with features:
 * - Open/close animations
 * - Category list
 * - Navigation links
 * - Social media links
 * - Responsive design
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, categories }) => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose); // Xử lý click bên ngoài để đóng sidebar

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-full bg-darkColor/50 shadow-xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-300`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-darkColor h-full text-primary-foreground p-10 border-r border-r-hoverColor/30 flex flex-col gap-6"
      >
        {/* Header với logo và nút đóng - Header with logo and close button */}
        <div className="flex items-center justify-between">
          <Logo className="text-white">E-mart</Logo>
          <button onClick={onClose} className="hover:text-red-500 hoverEffect cursor-pointer">
            <X />
          </button>
        </div>

        {/* Danh sách danh mục - Category list */}
        <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide text-zinc-400">
          <Link
            onClick={onClose}
            href={'/'}
            className={`hover:text-white hoverEffect ${pathname === `/` && 'text-white'}`}
          >
            Home
          </Link>
          {categories?.map(item => (
            <Link
              onClick={onClose}
              key={item?.title}
              href={`/category/${item?.slug?.current}`}
              className={`hover:text-white hoverEffect ${pathname === `/category/${item?.slug?.current}` && 'text-white'}`}
            >
              {item?.title}
            </Link>
          ))}
        </div>

        {/* Social media links */}
        <SocialMedia />
      </motion.div>
    </div>
  );
};

export default Sidebar;
