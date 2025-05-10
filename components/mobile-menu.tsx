'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { AlignLeft } from 'lucide-react'; // Icon cho nút menu
import { useState } from 'react'; // React hook for state management
import Sidebar from '@/components/side-bar'; // Sidebar component
import { CATEGORIES_QUERYResult } from '@/sanity.types'; // Types cho Sanity data

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  categories: CATEGORIES_QUERYResult; // Danh sách danh mục
}

/**
 * MobileMenu Component
 * Component hiển thị menu navigation cho mobile với các tính năng:
 * - Toggle button để mở/đóng sidebar
 * - Sidebar với danh sách danh mục
 * - Responsive design (chỉ hiển thị trên mobile)
 *
 * Mobile navigation menu component with features:
 * - Toggle button for sidebar
 * - Sidebar with category list
 * - Responsive design (only visible on mobile)
 */
const MobileMenu = ({ categories }: Props) => {
  // State để kiểm soát trạng thái sidebar
  // State to control sidebar status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function để toggle sidebar
  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle button */}
      <button onClick={toggleSidebar}>
        <AlignLeft className="w-6 h-6 hover:text-hoverColor hoverEffect md:hidden" />
      </button>

      {/* Sidebar container */}
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categories={categories}
        />
      </div>
    </>
  );
};

export default MobileMenu;
