"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion"
import { Mail, Calendar, ArrowLeft, LogOut, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { 
  BlogPost, 
  categories, 
  getAllBlogPosts, 
  saveBlogPost, 
  deleteBlogPost, 
  calculateReadTime 
} from '@/app/lib/blog'

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

interface Subscriber {
  _id: string
  email: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState('overview')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const emptyBlogPost: BlogPost = {
    id: Date.now(),
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    author: '',
    category: categories[0],
    imageUrl: '',
    readTime: '5 min read',
    published: false
  }

  useEffect(() => {
    fetchContacts()
    fetchSubscribers()
    setBlogPosts(getAllBlogPosts())
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts')
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch contacts')
      }
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      setError('Failed to load contacts')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter')
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch newsletter subscribers')
      }
      const data = await response.json()
      setSubscribers(data)
    } catch (error) {
      console.error('Failed to load subscribers:', error)
      // Don't set the main error state to avoid overriding contact errors
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  // Handle creating a new blog post
  const handleCreateNewPost = () => {
    setEditingPost({...emptyBlogPost, id: Date.now()})
    setIsEditing(true)
  }

  // Handle editing an existing blog post
  const handleEditPost = (post: BlogPost) => {
    setEditingPost({...post})
    setIsEditing(true)
  }

  // Handle saving a blog post (new or edited)
  const handleSavePost = () => {
    if (!editingPost) return
    
    if (isEditing && blogPosts.some(post => post.id === editingPost.id)) {
      // Update existing post
      setBlogPosts(blogPosts.map(post => 
        post.id === editingPost.id ? editingPost : post
      ))
    } else {
      // Add new post
      setBlogPosts([...blogPosts, editingPost])
    }
    
    // Save to shared storage
    saveBlogPost(editingPost)
    
    setIsEditing(false)
    setEditingPost(null)
  }

  // Handle deleting a blog post
  const handleDeletePost = (id: number) => {
    // Delete from local state
    setBlogPosts(blogPosts.filter(post => post.id !== id))
    
    // Delete from shared storage
    deleteBlogPost(id)
  }

  // Handle toggling publish status
  const handleTogglePublish = (id: number) => {
    const updatedPosts = blogPosts.map(post => {
      if (post.id === id) {
        const updatedPost = {...post, published: !post.published}
        // Save the updated post to shared storage
        saveBlogPost(updatedPost)
        return updatedPost
      }
      return post
    })
    
    setBlogPosts(updatedPosts)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingPost) return
    
    const { name, value } = e.target
    setEditingPost({
      ...editingPost,
      [name]: value
    })
  }

  // Update read time when content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!editingPost) return
    
    const content = e.target.value
    const readTime = calculateReadTime(content)
    
    setEditingPost({
      ...editingPost,
      content,
      readTime
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-white/80">Welcome, Admin</span>
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content area with significant top margin to avoid overlap */}
      <div className="pt-20">
        {/* Tab navigation */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'blog' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Blog Management
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'contacts' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact Submissions
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'subscribers' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Newsletter Subscribers
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'users' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Main content */}
        <main className="container mx-auto px-4 py-6">
          <div className="bg-black/40 rounded-xl border border-white/5 p-8">
            {error && (
              <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                {error}
              </div>
            )}

            {activeTab === 'overview' && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
                  <p className="text-white/60">View and manage your blog posts and newsletter subscribers</p>
                </div>

                <div className="grid gap-4">
                  <div className="bg-[#0021a7]/20 p-4 rounded-lg border border-[#0021a7]/30">
                    <h3 className="text-lg font-semibold mb-2">Total Blog Posts</h3>
                    <p className="text-3xl font-bold text-[#00b8ff]">{blogPosts.length}</p>
                  </div>
                  <div className="bg-[#0021a7]/20 p-4 rounded-lg border border-[#0021a7]/30">
                    <h3 className="text-lg font-semibold mb-2">Published Posts</h3>
                    <p className="text-3xl font-bold text-[#00b8ff]">
                      {blogPosts.filter(post => post.published).length}
                    </p>
                  </div>
                  <div className="bg-[#0021a7]/20 p-4 rounded-lg border border-[#0021a7]/30">
                    <h3 className="text-lg font-semibold mb-2">Draft Posts</h3>
                    <p className="text-3xl font-bold text-[#00b8ff]">
                      {blogPosts.filter(post => !post.published).length}
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'blog' && !isEditing && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Blog Management</h2>
                  <p className="text-white/60">Create, edit, and manage your blog posts</p>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Blog Posts</h3>
                  <button 
                    onClick={handleCreateNewPost}
                    className="bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                  >
                    Create New Post
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#0021a7]/30 text-left">
                        <th className="p-3 rounded-tl-lg">Title</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Author</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 rounded-tr-lg">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPosts.map((post, index) => (
                        <tr 
                          key={post.id} 
                          className={`border-b border-[#0021a7]/20 ${
                            index % 2 === 0 ? 'bg-black/20' : 'bg-black/40'
                          }`}
                        >
                          <td className="p-3">{post.title}</td>
                          <td className="p-3">
                            <span className="bg-[#00b8ff]/10 text-[#00b8ff] text-xs font-semibold px-2 py-1 rounded-full">
                              {post.category}
                            </span>
                          </td>
                          <td className="p-3">{post.date}</td>
                          <td className="p-3">{post.author}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              post.published 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditPost(post)}
                                className="bg-[#0021a7]/70 hover:bg-[#0021a7] text-white px-2 py-1 rounded text-sm transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleTogglePublish(post.id)}
                                className={`${
                                  post.published 
                                    ? 'bg-yellow-600/70 hover:bg-yellow-600' 
                                    : 'bg-green-600/70 hover:bg-green-600'
                                } text-white px-2 py-1 rounded text-sm transition-colors`}
                              >
                                {post.published ? 'Unpublish' : 'Publish'}
                              </button>
                              <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="bg-red-600/70 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {blogPosts.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-white/70">
                            No blog posts found. Create your first post!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'blog' && isEditing && (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{editingPost?.id === emptyBlogPost.id ? 'Create New Post' : 'Edit Post'}</h2>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSavePost(); }} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={editingPost?.title || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium mb-2">Excerpt</label>
                    <input
                      type="text"
                      id="excerpt"
                      name="excerpt"
                      value={editingPost?.excerpt || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      id="content"
                      name="content"
                      value={editingPost?.content || ''}
                      onChange={handleContentChange}
                      rows={10}
                      className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                      required
                    ></textarea>
                    <p className="text-sm text-white/60 mt-1">Read time: {editingPost?.readTime}</p>
                  </div>

                  {/* Author */}
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-2">Author</label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={editingPost?.author || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={editingPost?.category || categories[0]}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={editingPost?.date || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="text"
                      id="imageUrl"
                      name="imageUrl"
                      value={editingPost?.imageUrl || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-sm text-white/60 mt-1">Leave empty to use a placeholder</p>
                  </div>

                  {/* Published Status */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      name="published"
                      checked={editingPost?.published || false}
                      onChange={(e) => setEditingPost(prev => prev ? {...prev, published: e.target.checked} : prev)}
                      className="h-4 w-4 text-[#00b8ff] focus:ring-[#00b8ff] border-[#0021a7]/30 rounded"
                    />
                    <label htmlFor="published" className="ml-2 block text-sm">
                      Publish this post
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
                    >
                      {editingPost?.id === emptyBlogPost.id ? 'Create Post' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'contacts' && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Contact Form Submissions</h2>
                  <p className="text-white/60">View and manage contact form submissions from your website</p>
                </div>

                {contacts.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Email</th>
                          <th className="py-3 px-4 text-left">Subject</th>
                          <th className="py-3 px-4 text-left">Date</th>
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact) => (
                          <tr key={contact._id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-4 px-4">{contact.name}</td>
                            <td className="py-4 px-4">{contact.email}</td>
                            <td className="py-4 px-4">{contact.subject}</td>
                            <td className="py-4 px-4">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <button
                                onClick={() => {
                                  // View message details
                                  alert(`Message: ${contact.message}`)
                                }}
                                className="text-[#00b8ff] hover:text-[#0021a7] transition-colors"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/60">
                    No contact form submissions yet.
                  </div>
                )}
              </>
            )}

            {activeTab === 'subscribers' && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Newsletter Subscribers</h2>
                  <p className="text-white/60">View and manage newsletter subscribers from your website</p>
                </div>

                {subscribers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-3 px-4 text-left">Email</th>
                          <th className="py-3 px-4 text-left">Date Subscribed</th>
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber._id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-4 px-4">{subscriber.email}</td>
                            <td className="py-4 px-4">
                              {new Date(subscriber.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <button
                                onClick={() => {
                                  // Implement unsubscribe functionality
                                  alert(`Unsubscribe ${subscriber.email}?`)
                                }}
                                className="text-red-400 hover:text-red-500 transition-colors"
                              >
                                Unsubscribe
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/60">
                    No newsletter subscribers yet.
                  </div>
                )}
              </>
            )}

            {activeTab === 'users' && (
              <div className="bg-[#0021a7]/10 rounded-xl p-6 border border-[#0021a7]/20">
                <h2 className="text-2xl font-bold mb-6">User Management</h2>
                <p className="text-white/70">User management functionality will be implemented in a future update.</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-[#0021a7]/10 rounded-xl p-6 border border-[#0021a7]/20">
                <h2 className="text-2xl font-bold mb-6">Settings</h2>
                <p className="text-white/70">Settings functionality will be implemented in a future update.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 