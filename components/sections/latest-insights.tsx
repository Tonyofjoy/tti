"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { getPublishedBlogPosts, BlogPost } from "@/app/lib/blog"

const LatestInsights = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  // Only render after client-side hydration and load blog posts
  useEffect(() => {
    setIsMounted(true)
    // Get published posts and take only the most recent 3
    const posts = getPublishedBlogPosts();
    setBlogPosts(posts.slice(0, 3));
  }, [])

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Latest Insights
            </h2>
            <p className="text-lg text-white/70">Stay ahead with our latest thoughts on technology and innovation</p>
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {blogPosts.length > 0 ? (
            blogPosts.map((post, index) => {
              const isFeatured = index === 0; // First post is featured
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn("group", isFeatured && "lg:col-span-2 lg:row-span-2")}
                >
                  <div
                    className={cn(
                      "h-full rounded-xl border border-white/10",
                      "bg-white/5 backdrop-blur-sm overflow-hidden",
                      "transition-all duration-300 hover:border-[#00b8ff]/30",
                    )}
                  >
                    {/* Image - Always use header.png */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src="/images/header.png"
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3
                        className={cn(
                          "font-semibold mb-3 group-hover:text-[#00b8ff] transition-colors",
                          isFeatured ? "text-2xl" : "text-xl",
                        )}
                      >
                        {post.title}
                      </h3>
                      <p className="text-white/60 mb-4">{post.excerpt}</p>
                      <Link href={`/resources/blog/${post.id}`} passHref>
                        <Button variant="ghost" className="group/button px-0 hover:bg-transparent">
                          <span className="text-[#00b8ff] group-hover/button:mr-2 transition-all">Read More</span>
                          <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover/button:opacity-100 group-hover/button:ml-0 transition-all" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-white/60">No articles found. Check back soon for new content!</p>
            </div>
          )}
        </div>

        {/* CTA Button to Blog Page */}
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/resources/blog" passHref>
              <Button className="bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white px-8 py-6 rounded-full hover:opacity-90 transition-opacity">
                <span className="text-base font-medium mr-2">View All Articles</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LatestInsights

