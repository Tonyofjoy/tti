import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  useBrandFont?: boolean; // Optional prop to use BETELGUESSE font instead
}

export function Heading({ 
  level = 2, 
  children, 
  className,
  useBrandFont = false
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  const baseStyles = "tracking-tight";
  
  // Font classes are applied via global CSS, but we can add specific styling here
  const styles: Record<number, string> = {
    1: `text-4xl md:text-5xl lg:text-6xl ${useBrandFont ? 'font-betelgeuse' : 'font-deltha'} mb-6`,
    2: `text-3xl md:text-4xl ${useBrandFont ? 'font-betelgeuse' : 'font-deltha'} mb-4`,
    3: `text-2xl md:text-3xl ${useBrandFont ? 'font-betelgeuse' : 'font-deltha'} mb-3`,
    4: `text-xl md:text-2xl ${useBrandFont ? 'font-betelgeuse' : 'font-raleway font-bold'} mb-2`,
    5: `text-lg md:text-xl ${useBrandFont ? 'font-betelgeuse' : 'font-raleway font-bold'} mb-2`,
    6: `text-base md:text-lg ${useBrandFont ? 'font-betelgeuse' : 'font-raleway font-bold'} mb-1`,
  };
  
  return React.createElement(
    Tag,
    { className: cn(baseStyles, styles[level], className) },
    children
  );
} 