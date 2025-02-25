import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ 
  level = 2, 
  children, 
  className 
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  const baseStyles = "tracking-tight";
  
  // Font classes are applied via global CSS, but we can add specific styling here
  const styles: Record<number, string> = {
    1: "text-4xl md:text-5xl lg:text-6xl font-deltha mb-6",
    2: "text-3xl md:text-4xl font-betelgeuse mb-4",
    3: "text-2xl md:text-3xl font-betelgeuse mb-3",
    4: "text-xl md:text-2xl font-betelgeuse mb-2",
    5: "text-lg md:text-xl font-betelgeuse mb-2",
    6: "text-base md:text-lg font-betelgeuse mb-1",
  };
  
  return React.createElement(
    Tag,
    { className: cn(baseStyles, styles[level], className) },
    children
  );
} 