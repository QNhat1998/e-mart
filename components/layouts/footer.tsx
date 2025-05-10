'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import Link from 'next/link'; // Next.js Link component
import Logo from '../logo'; // Logo component
import FooterTop from './footer-top'; // Footer top section component
import SocialMedia from '../social-media'; // Social media component
import { categoriesData, quickLinksData } from '@/lib/constants'; // Constants data

/**
 * Footer Component
 * Component hiển thị footer của trang với các tính năng:
 * - Contact information
 * - Quick links
 * - Categories
 * - Newsletter subscription
 * - Social media links
 * - Copyright notice
 * - Responsive design
 *
 * Footer component with features:
 * - Contact details
 * - Quick navigation links
 * - Product categories
 * - Email subscription
 * - Social media integration
 * - Copyright information
 * - Responsive design
 */
const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section với thông tin liên hệ - Top section with contact info */}
        <FooterTop />

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info section */}
          <div className="space-y-4">
            <Logo>E-mart</Logo>
            <p className="text-gray-600 text-sm">
              Khám phá bộ sưu tập nội thất được chọn lọc tại E-mart, kết hợp giữa phong cách và
              thoải mái để nâng cao không gian sống của bạn.
            </p>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-darkColor hover:text-darkColor"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>

          {/* Quick links section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinksData?.map(item => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium hoverEffect"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-3">
              {categoriesData.map(item => (
                <li key={item?.title}>
                  <Link
                    href={`/category${item?.href}`}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium hoverEffect"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Bản tin</h3>
            <p className="text-gray-600 text-sm mb-4">
              Đăng ký nhận bản tin của chúng tôi để nhận được cập nhật và ưu đãi độc quyền.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} E-mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
