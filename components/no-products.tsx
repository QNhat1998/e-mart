'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { cn } from '@/lib/utils'; // Utility function để merge Tailwind classes
import { motion } from 'framer-motion'; // Animation library
import { Loader2 } from 'lucide-react'; // Loading icon

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  selectedTab: string; // Tab đang được chọn
  className?: string; // Optional className for custom styling
}

/**
 * NoProductAvailable Component
 * Component hiển thị thông báo khi không có sản phẩm với các tính năng:
 * - Animation khi hiển thị
 * - Loading indicator
 * - Thông báo thân thiện
 * - Custom styling thông qua className
 *
 * No products message component with features:
 * - Display animations
 * - Loading indicator
 * - Friendly message
 * - Custom styling via className
 */
const NoProductAvailable = ({ selectedTab, className }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10',
        className
      )}
    >
      {/* Tiêu đề - Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">No Product Available</h2>
      </motion.div>

      {/* Thông báo chính - Main message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        We&apos;re sorry, but there are no products matching on{' '}
        <span className="text-base font-semibold text-darkColor">{selectedTab}</span> criteria at
        the moment.
      </motion.p>

      {/* Loading indicator */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="flex items-center space-x-2 text-blue-600"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>We&apos;re restocking shortly</span>
      </motion.div>

      {/* Thông báo phụ - Secondary message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500"
      >
        Please check back later or explore our other product categories.
      </motion.p>
    </div>
  );
};

export default NoProductAvailable;
