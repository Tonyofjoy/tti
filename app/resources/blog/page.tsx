"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedBlogPosts, BlogPost } from '@/app/lib/blog';

// Blog page component
export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  
  // Load blog posts on component mount
  useEffect(() => {
    setBlogPosts(getPublishedBlogPosts());
  }, []);

  // Featured post is the first one (if available)
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
  // Regular posts are the rest
  const regularPosts = blogPosts.length > 1 ? blogPosts.slice(1) : [];

  return (
    <div className="blog-page bg-[#000000] text-white">
      {/* Hero Section */}
      <section className="blog-hero relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7] to-[#00b8ff] opacity-20"></div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#00b8ff]">
              Insights & Perspectives
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80">
              Explore our latest thoughts on technology, business growth, and digital innovation
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="bg-[#0021a7]/10 rounded-2xl overflow-hidden shadow-lg shadow-[#00b8ff]/10 transition-transform duration-300 hover:shadow-xl hover:shadow-[#00b8ff]/20 hover:-translate-y-1 border border-[#0021a7]/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7]/40 to-[#00b8ff]/20"></div>
                  <div className="relative h-full w-full">
                    {/* Replace with actual Image component when you have the images */}
                    <div className="w-full h-full bg-[#000000]/80 flex items-center justify-center">
                      <span className="text-[#00b8ff]">Featured Image</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="bg-[#00b8ff]/10 text-[#00b8ff] text-xs font-semibold px-3 py-1 rounded-full border border-[#00b8ff]/30">
                      {featuredPost.category}
                    </span>
                    <span className="mx-2 text-[#00b8ff]/60">•</span>
                    <span className="text-white/60 text-sm">{featuredPost.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/70 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#0021a7]/30 border border-[#00b8ff]/20 mr-3"></div>
                      <div>
                        <p className="font-medium text-white">{featuredPost.author}</p>
                        <p className="text-sm text-white/60">{featuredPost.readTime}</p>
                      </div>
                    </div>
                    <Link href={`/resources/blog/${featuredPost.id}`} className="inline-flex items-center text-[#00b8ff] font-medium hover:text-white transition-colors">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="py-12 md:py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Latest Articles</h2>
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <div key={post.id} className="bg-[#0021a7]/10 rounded-xl overflow-hidden shadow-md shadow-[#00b8ff]/5 transition-all duration-300 hover:shadow-lg hover:shadow-[#00b8ff]/10 hover:-translate-y-1 border border-[#0021a7]/20">
                  <div className="relative h-48">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7]/30 to-[#00b8ff]/10"></div>
                    <div className="relative h-full w-full">
                      {/* Replace with actual Image component when you have the images */}
                      <div className="w-full h-full bg-[#000000]/80 flex items-center justify-center">
                        <span className="text-[#00b8ff]">Post Image</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-[#00b8ff]/10 text-[#00b8ff] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#00b8ff]/30">
                        {post.category}
                      </span>
                      <span className="mx-2 text-[#00b8ff]/60">•</span>
                      <span className="text-white/60 text-xs">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#0021a7]/30 border border-[#00b8ff]/20 mr-2"></div>
                        <p className="text-sm font-medium text-white">{post.author}</p>
                      </div>
                      <span className="text-xs text-white/60">{post.readTime}</span>
                    </div>
                    <Link href={`/resources/blog/${post.id}`} className="mt-4 inline-flex items-center text-[#00b8ff] text-sm font-medium hover:text-white transition-colors">
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60">No articles found. Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7]/30 to-[#00b8ff]/10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Stay Updated with Our Newsletter</h2>
            <p className="text-lg text-white/70 mb-8">
              Subscribe to receive the latest insights, trends, and expert advice directly to your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="py-3 px-6 rounded-full border border-[#0021a7] bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent w-full md:w-96"
              />
              <button className="bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-white/50 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>

      {/* Tagline Banner */}
      <section className="py-12 bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider">
            INNOVATING FOR LIMITLESS GROWTH
          </h2>
        </div>
      </section>
    </div>
  );
}
