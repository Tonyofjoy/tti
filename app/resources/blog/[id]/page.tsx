import { getBlogPostById, BlogPost } from '@/app/lib/blog';
import BlogPostDetailClient from './BlogPostDetailClient';

// Server component that handles the params
export default function BlogPostPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const blogPost = !isNaN(id) ? getBlogPostById(id) : null;
  
  return <BlogPostDetailClient blogPost={blogPost} />;
} 