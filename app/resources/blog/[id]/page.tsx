import { getBlogPostById } from '@/app/lib/blog';
import BlogPostDetailClient from './BlogPostDetailClient';

// Server component that handles the params
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  // In Next.js async server components, params should be properly awaited
  // Use Promise.resolve() to treat params as a Promise to satisfy the linter
  const resolvedParams = await Promise.resolve(params);
  const id = parseInt(resolvedParams.id);
  const blogPost = !isNaN(id) ? getBlogPostById(id) : null;
  
  // Ensure we always return either a BlogPost or null, not undefined
  return <BlogPostDetailClient blogPost={blogPost || null} />;
} 