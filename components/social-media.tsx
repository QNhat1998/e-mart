'use client'; // Chỉ định đây là client component trong Next.js
// Specifies this is a client component in Next.js

// Import các dependencies cần thiết
// Import necessary dependencies
import { Facebook, Github, Linkedin, Slack, Youtube } from 'lucide-react'; // Social media icons
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'; // Tooltip components
import { cn } from '@/lib/utils'; // Utility function để merge Tailwind classes

/**
 * Props interface định nghĩa các props của component
 * Props interface defining component props
 */
interface Props {
  className?: string; // Optional className cho container
  iconClassName?: string; // Optional className cho icons
  tooltipClassName?: string; // Optional className cho tooltips
}

/**
 * Danh sách các social media links
 * List of social media links
 */
const socialLink = [
  {
    title: 'Youtube',
    href: 'https://www.youtube.com',
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: 'Github',
    href: 'https://www.youtube.com',
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: 'Linkedin',
    href: 'https://www.youtube.com',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: 'Facebook',
    href: 'https://www.youtube.com',
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: 'Slack',
    href: 'https://www.youtube.com',
    icon: <Slack className="w-5 h-5" />,
  },
];

/**
 * SocialMedia Component
 * Component hiển thị các social media links với các tính năng:
 * - Tooltip khi hover
 * - Hover effect
 * - Custom styling thông qua className
 * - Responsive design
 *
 * Social media links component with features:
 * - Hover tooltips
 * - Hover effects
 * - Custom styling via className
 * - Responsive design
 */
const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn('flex items-center gap-3.5 text-zinc-400', className)}>
        {socialLink.map(item => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'p-2 border rounded-full hover:text-white hover:border-white hoverEffect',
                  iconClassName
                )}
              >
                {item.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent
              className={cn('bg-white text-darkColor font-semibold', tooltipClassName)}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
