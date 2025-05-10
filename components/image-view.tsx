'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from '@/sanity.types'; // Types cho Sanity image
import { urlFor } from '@/sanity/lib/image'; // Helper function để xử lý Sanity images
import Image from 'next/image'; // Next.js Image component
import { useState } from 'react'; // React hook for state management
import { motion, AnimatePresence } from 'motion/react'; // Animation components

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: 'image';
    _key: string;
  }>;
}

/**
 * ImageView Component
 * Component hiển thị hình ảnh sản phẩm với các tính năng:
 * - Gallery hình ảnh
 * - Animation khi chuyển ảnh
 * - Thumbnail navigation
 * - Responsive design
 *
 * Product image viewer component with features:
 * - Image gallery
 * - Transition animations
 * - Thumbnail navigation
 * - Responsive design
 */
const ImageView = ({ images = [] }: Props) => {
  const [active, setActive] = useState(images[0]); // State lưu ảnh đang active

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      {/* Container ảnh chính - Main image container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden"
        >
          <Image
            src={urlFor(active).url()}
            alt="productImage"
            width={700}
            height={700}
            priority
            className="w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md"
          />
        </motion.div>
      </AnimatePresence>

      {/* Grid thumbnails - Lưới ảnh nhỏ */}
      <div className="grid grid-cols-6 gap-2 h-20 md:h-28">
        {images.map(image => (
          <button
            key={image._key}
            onClick={() => setActive(image)}
            className={`border rounded-md overflow-hidden hover:cursor-pointer ${
              active._key === image._key ? 'ring-1 ring-darkColor' : ''
            }`}
          >
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail ${image._key}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
