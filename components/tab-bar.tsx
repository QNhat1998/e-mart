'use client';
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { productType } from '@/lib/constants';
import { Repeat } from 'lucide-react';

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

/**
 * Tabbar Component
 * Component hiển thị thanh tab với các tính năng:
 * - Chuyển đổi giữa các tab
 * - Nút refresh
 * - Active state cho tab được chọn
 * - Hover effect
 * - Responsive design
 *
 * Tab bar component with features:
 * - Tab switching
 * - Refresh button
 * - Active state for selected tab
 * - Hover effects
 * - Responsive design
 */
const Tabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold">
      {/* Danh sách các tab - List of tabs */}
      <div className="flex items-center gap-1.5">
        {productType?.map(item => (
          <button
            onClick={() => onTabSelect(item?.title)}
            key={item?.title}
            className={`border border-darkColor px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-darkColor hover:text-white cursor-pointer hoverEffect ${selectedTab === item?.title && 'bg-darkColor text-white'}`}
          >
            {item?.title}
          </button>
        ))}
      </div>

      {/* Nút refresh - Refresh button */}
      <button className="border border-darkColor px-2 py-2 rounded-full hover:bg-darkColor hover:text-white hoverEffect">
        <Repeat className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Tabbar;
