"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { BlogPost, getPublishedBlogPosts } from '@/app/lib/blog';

// Client component for blog post detail
export default function BlogPostDetailClient({ blogPost }: { blogPost: BlogPost | null }) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Get related posts by category
    if (blogPost) {
      const allPosts = getPublishedBlogPosts();
      const filtered = allPosts
        .filter(post => 
          post.id !== blogPost.id && 
          post.category === blogPost.category
        )
        .slice(0, 3); // Get up to 3 related posts
      
      // If we don't have enough posts in the same category, add some from other categories
      if (filtered.length < 3) {
        const otherPosts = allPosts
          .filter(post => 
            post.id !== blogPost.id && 
            post.category !== blogPost.category
          )
          .slice(0, 3 - filtered.length);
        
        setRelatedPosts([...filtered, ...otherPosts]);
      } else {
        setRelatedPosts(filtered);
      }
    }
  }, [blogPost]);

  // Share functionality
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    if (typeof window === 'undefined' || !blogPost) return;
    
    const url = window.location.href;
    const title = blogPost.title;
    const description = blogPost.excerpt;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => {
            alert('Link copied to clipboard!');
          })
          .catch(err => {
            console.error('Failed to copy link: ', err);
          });
        break;
    }
  };

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-[#000000] text-white">
        <div className="container mx-auto px-4 py-16">
          <Link href="/resources/blog" className="inline-flex items-center text-[#00b8ff] hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link href="/resources/blog" className="bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-opacity">
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Section with Title */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7] to-[#00b8ff] opacity-20"></div>
        <div className="container mx-auto px-4">
          <Link href="/resources/blog" className="inline-flex items-center text-[#00b8ff] hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="bg-[#00b8ff]/10 text-[#00b8ff] text-sm font-semibold px-3 py-1 rounded-full border border-[#00b8ff]/30">
                {blogPost.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {blogPost.title}
            </h1>
            <div className="flex flex-wrap items-center text-white/70 gap-4 mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{blogPost.readTime}</span>
              </div>
              <div className="flex items-center">
                <span>By {blogPost.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Featured Image */}
            <div className="mb-12 rounded-xl overflow-hidden">
              {blogPost.imageUrl ? (
                <img 
                  src={blogPost.imageUrl} 
                  alt={blogPost.title} 
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-64 bg-[#0021a7]/30 flex items-center justify-center">
                  <span className="text-[#00b8ff]">Featured Image</span>
                </div>
              )}
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-white/80 mb-8 font-medium">
                {blogPost.excerpt}
              </p>
              
              {/* Render the content - in a real app, you might use a markdown renderer here */}
              <div className="text-white/80 leading-relaxed whitespace-pre-line">
                {blogPost.content}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between">
                <h3 className="text-lg font-semibold mb-4 md:mb-0">Share this article</h3>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-full bg-[#0021a7]/20 hover:bg-[#0021a7]/40 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-full bg-[#0021a7]/20 hover:bg-[#0021a7]/40 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-full bg-[#0021a7]/20 hover:bg-[#0021a7]/40 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    className="p-2 rounded-full bg-[#0021a7]/20 hover:bg-[#0021a7]/40 transition-colors"
                    aria-label="Copy link"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
          
          {relatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <Link href={`/resources/blog/${post.id}`} key={post.id}>
                  <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-[#00b8ff]/30 transition-colors group">
                    {/* Post Image */}
                    <div className="h-48 overflow-hidden">
                      {post.imageUrl ? (
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#0021a7]/30 flex items-center justify-center">
                          <span className="text-[#00b8ff]">Featured Image</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Post Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="bg-[#00b8ff]/10 text-[#00b8ff] text-xs font-semibold px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-[#00b8ff] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-xs text-white/50">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/60">No related articles found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7]/30 to-[#00b8ff]/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-lg text-white/70 mb-8">
              Let's discuss how our technology solutions can help you achieve your business goals.
            </p>
            <Link 
              href="/about/contact" 
              className="inline-flex items-center bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 