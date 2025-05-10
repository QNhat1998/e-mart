'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { CATEGORIES_QUERYResult, Category } from '@/sanity.types'; // Types cho Sanity data
import Link from 'next/link'; // Next.js Link component
import { usePathname } from 'next/navigation'; // Hook để lấy đường dẫn hiện tại

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  categories: CATEGORIES_QUERYResult; // Danh sách danh mục
}

/**
 * Menu Component
 * Component hiển thị menu navigation với các tính năng:
 * - Links đến các trang chính
 * - Active state cho trang hiện tại
 * - Hover effect với underline animation
 * - Responsive design (ẩn trên mobile)
 *
 * Navigation menu component with features:
 * - Links to main pages
 * - Active state for current page
 * - Hover effect with underline animation
 * - Responsive design (hidden on mobile)
 */
const Menu = ({ categories }: Props) => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold text-lightColor">
      {/* Link trang chủ - Home link */}
      <Link
        href={'/'}
        className={`hover:text-darkColor hoverEffect relative group ${pathname === '/' && 'text-darkColor'}`}
      >
        Home
        {/* Underline animation - Left side */}
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor transition-all duration-300 group-hover:w-1/2 group-hover:left-0 ${pathname === '/' && 'w-1/2'}`}
        />
        {/* Underline animation - Right side */}
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor transition-all duration-300 group-hover:w-1/2 group-hover:right-0 ${pathname === '/' && 'w-1/2'}`}
        />
      </Link>

      {/* Danh sách danh mục - Category list */}
      {categories?.map((category: Category) => (
        <Link
          key={category?._id}
          href={`/category/${category?.slug?.current}`}
          className={`hover:text-darkColor hoverEffect relative group ${pathname === `/category/${category?.slug?.current}` && 'text-darkColor'}`}
        >
          {category?.title}
          {/* Underline animation - Left side */}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor transition-all duration-300 group-hover:w-1/2 group-hover:left-0 ${pathname === `/category/${category?.slug?.current}` && 'w-1/2'}`}
          />
          {/* Underline animation - Right side */}
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor transition-all duration-300 group-hover:w-1/2 group-hover:right-0 ${pathname === `/category/${category?.slug?.current}` && 'w-1/2'}`}
          />
        </Link>
      ))}

      {/* Link trang shop - Shop link */}
      <Link
        href={'/shop'}
        className={`hover:text-darkColor hoverEffect relative group ${pathname === '/' && 'text-darkColor'}`}
      >
        Shop
        {/* Underline animation - Left side */}
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor transition-all duration-300 group-hover:w-1/2 group-hover:left-0 ${pathname === '/shop' && 'w-1/2'}`}
        />
        {/* Underline animation - Right side */}
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor transition-all duration-300 group-hover:w-1/2 group-hover:right-0 ${pathname === '/shop' && 'w-1/2'}`}
        />
      </Link>
    </div>
  );
};

export default Menu;
