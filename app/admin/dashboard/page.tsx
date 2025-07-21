"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion"
import { Mail, Calendar, ArrowLeft, LogOut, Users, Briefcase, Download, CheckCircle, XCircle, Clock, Edit, Plus, Trash, Calculator } from "lucide-react"
import { useRouter } from "next/navigation"
import { 
  BlogPost, 
  categories, 
  getAllBlogPosts, 
  saveBlogPost, 
  deleteBlogPost, 
  calculateReadTime 
} from '@/app/lib/blog'
import { JobApplication } from '@/app/api/applications/route'

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

interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  description: string
  requirements: string[]
  icon: string
}

// Layout component to hide main navigation
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <style jsx global>{`
        header.main-header, footer.main-footer {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState('overview')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null)
  const [isEditingPosition, setIsEditingPosition] = useState(false)
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

  const emptyJobPosition: JobPosition = {
    id: crypto.randomUUID(),
    title: '',
    department: '',
    location: '',
    description: '',
    requirements: [''],
    icon: 'Briefcase'
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([
          fetchContacts(),
          fetchSubscribers(),
          fetchApplications(),
          fetchJobPositions()
        ])
        setBlogPosts(getAllBlogPosts())
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
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
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications')
      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error('Error fetching applications:', error)
      setError('Failed to load job applications')
    }
  }

  const fetchJobPositions = async () => {
    try {
      console.log('Admin: Fetching job positions from API with cache-busting...');
      // Add cache-busting query parameter to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/jobpositions?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      console.log('Admin: Job positions fetch response status:', response.status);
      
      if (response.ok) {
        try {
          const data = await response.json();
          console.log('Admin: Received job positions data:', data);
          
          if (Array.isArray(data)) {
            console.log('Admin: Setting job positions state with API data, count:', data.length);
            setJobPositions(data);
            // Clear any error that might have been set
            if (error && typeof error === 'string' && error.includes('job position')) {
              setError('');
            }
          } else {
            console.warn('Admin: API returned non-array data');
            setError('API returned invalid data format. Please refresh the page.');
            setJobPositions([]);
          }
        } catch (parseError) {
          console.error('Admin: Error parsing response JSON:', parseError);
          setError('Failed to parse job positions data from server');
          setJobPositions([]);
        }
      } else {
        console.warn('Admin: Job positions API response not OK:', response.status);
        try {
          const errorData = await response.json();
          console.error('Admin: API error details:', errorData);
          setError(`Failed to load job positions: ${errorData.error || 'Unknown error'}`);
        } catch (e) {
          setError(`Failed to load job positions: Server responded with status ${response.status}`);
        }
        // Keep existing positions to avoid flashing empty state
      }
    } catch (fetchError) {
      console.error('Admin: Error fetching job positions:', fetchError);
      setError('Network error when loading job positions');
    }
  };

  const saveJobPosition = async (position: JobPosition) => {
    try {
      console.log('Admin: Saving job position:', position);
      let response;
      
      // Create a copy of the current positions for fallback
      const currentPositions = [...jobPositions];
      
      if (jobPositions.some(p => p.id === position.id)) {
        // Update existing position - optimistically update UI first
        console.log('Admin: Optimistically updating existing position in UI');
        setJobPositions(prev => prev.map(p => p.id === position.id ? position : p));
        
        // Then send to API
        console.log('Admin: Sending PUT request to update position');
        response = await fetch(`/api/jobpositions/${position.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(position),
        });
      } else {
        // Add new position - optimistically update UI first
        console.log('Admin: Optimistically adding new position to UI');
        setJobPositions(prev => [...prev, position]);
        
        // Then send to API
        console.log('Admin: Sending POST request to create position');
        response = await fetch('/api/jobpositions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(position),
        });
      }
      
      console.log('Admin: Save response status:', response.status);
      
      if (!response.ok) {
        // Revert the optimistic update if API call fails
        console.error('Admin: API call failed, reverting UI to previous state');
        setJobPositions(currentPositions);
        
        // Extract error message
        try {
          const errorData = await response.json();
          throw new Error(`Failed to save job position: ${errorData.error || response.statusText}`);
        } catch (parseError) {
          throw new Error(`Failed to save job position: ${response.statusText}`);
        }
      }
      
      // Process successful response
      try {
        const responseData = await response.json();
        console.log('Admin: Save response data:', responseData);
        
        // If the API returns all positions, use that to update our state
        if (responseData.allPositions && Array.isArray(responseData.allPositions)) {
          console.log('Admin: Updating all positions from API response');
          setJobPositions(responseData.allPositions);
        } 
        // For PUT requests that return a single updated position
        else if (responseData.id && response.status === 200) {
          console.log('Admin: Updating single position in state');
          setJobPositions(prev => 
            prev.map(p => p.id === responseData.id ? responseData : p)
          );
        }
        
        return true;
      } catch (parseError) {
        console.warn('Admin: Could not parse response data, but operation succeeded');
        // Already updated the UI optimistically, so return success
        return true;
      }
    } catch (error) {
      console.error('Admin: Error saving job position:', error);
      setError(error instanceof Error ? error.message : 'Failed to save job position');
      return false;
    }
  };

  const deleteJobPosition = async (id: string) => {
    try {
      console.log('Admin: Deleting job position with ID:', id);
      
      // Store current positions for rollback if needed
      const currentPositions = [...jobPositions];
      
      // Optimistically update UI first
      console.log('Admin: Optimistically removing position from UI');
      setJobPositions(prevPositions => prevPositions.filter(pos => pos.id !== id));
      
      // Then send delete request to API
      const response = await fetch(`/api/jobpositions/${id}`, {
        method: 'DELETE',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      console.log('Admin: Delete response status:', response.status);
      
      if (!response.ok) {
        // Revert optimistic update on failure
        console.error('Admin: Delete request failed, reverting UI state');
        setJobPositions(currentPositions);
        
        // Extract error message
        try {
          const errorData = await response.json();
          throw new Error(`Failed to delete position: ${errorData.error || response.statusText}`);
        } catch (parseError) {
          throw new Error(`Failed to delete position: ${response.status} ${response.statusText}`);
        }
      }
      
      // Process successful response
      try {
        const responseData = await response.json();
        console.log('Admin: Delete response data:', responseData);
        
        // If we get back the remaining positions, use that to update state
        if (responseData.remainingPositions && Array.isArray(responseData.remainingPositions)) {
          console.log('Admin: Setting positions state from API response, count:', 
            responseData.remainingPositions.length);
          
          setJobPositions(responseData.remainingPositions);
        }
        
        return true;
      } catch (parseError) {
        console.warn('Admin: Could not parse response, but delete succeeded');
        // Already removed from UI optimistically, so return success
        return true;
      }
    } catch (error) {
      console.error('Admin: Error deleting job position:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete job position');
      return false;
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  // Handle creating a new job position
  const handleCreateNewPosition = () => {
    setEditingPosition({...emptyJobPosition, id: crypto.randomUUID()})
    setIsEditingPosition(true)
  }

  // Handle editing an existing job position
  const handleEditPosition = (position: JobPosition) => {
    setEditingPosition({...position})
    setIsEditingPosition(true)
  }

  // Handle saving a job position (new or edited)
  const handleSavePosition = async () => {
    if (!editingPosition) {
      setError('No position data to save');
      return;
    }
    
    // Clear any previous error
    setError("");
    
    try {
      setIsLoading(true);
      console.log('Admin: Attempting to save job position:', editingPosition);
      
      // Validate required fields
      if (!editingPosition.title || !editingPosition.department || 
          !editingPosition.location || !editingPosition.description) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }
      
      const success = await saveJobPosition(editingPosition);
      
      if (success) {
        console.log('Admin: Successfully saved job position');
        setIsEditingPosition(false);
        setEditingPosition(null);
      } else {
        console.error('Admin: Failed to save job position');
        // Error is already set in the saveJobPosition function
      }
    } catch (error) {
      console.error('Admin: Error in handleSavePosition:', error);
      setError('An error occurred while saving the job position.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a job position
  const handleDeletePosition = async (id: string) => {
    if (confirm('Are you sure you want to delete this position?')) {
      const success = await deleteJobPosition(id)
      if (!success) {
        setError('Failed to delete position')
      }
    }
  }

  // Handle adding a requirement to the position being edited
  const handleAddRequirement = () => {
    if (!editingPosition) return
    setEditingPosition({
      ...editingPosition,
      requirements: [...editingPosition.requirements, '']
    })
  }

  // Handle removing a requirement from the position being edited
  const handleRemoveRequirement = (index: number) => {
    if (!editingPosition) return
    const newRequirements = [...editingPosition.requirements]
    newRequirements.splice(index, 1)
    setEditingPosition({
      ...editingPosition,
      requirements: newRequirements
    })
  }

  // Handle updating a requirement
  const handleUpdateRequirement = (index: number, value: string) => {
    if (!editingPosition) return
    const newRequirements = [...editingPosition.requirements]
    newRequirements[index] = value
    setEditingPosition({
      ...editingPosition,
      requirements: newRequirements
    })
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
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-xl">Loading...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      {/* Main content wrapper with proper spacing */}
      <div className="min-h-screen bg-black mt-16"> {/* Added mt-16 margin-top to account for site header */}
        {/* Admin Dashboard header */}
        <header className="sticky top-0 left-0 right-0 z-50 bg-black border-b border-white/10 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Welcome, Admin</span>
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main dashboard content with proper padding */}
        <div className="pt-6 pb-20"> {/* Changed to pt-6 as we're using margin on the parent */}
          {/* Tab navigation */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex space-x-4 overflow-x-auto pb-2">
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
                onClick={() => setActiveTab('applications')}
                className={`px-5 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'applications' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase className="h-4 w-4" /> Job Applications
              </button>
              <button
                onClick={() => setActiveTab('positions')}
                className={`px-5 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'positions' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Plus className="h-4 w-4" /> Job Positions
              </button>
              <Link
                href="/admin/bookings"
                className={`px-5 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/5`}
              >
                <Calculator className="h-4 w-4" /> Project Bookings
              </Link>
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

              {activeTab === 'positions' && !isEditingPosition && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Job Positions Management</h2>
                    <p className="text-white/60">Create, edit, and manage job positions displayed on the careers page</p>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Current Openings</h3>
                    <button 
                      onClick={handleCreateNewPosition}
                      className="bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" /> Add New Position
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#0021a7]/30 text-left">
                          <th className="p-3 rounded-tl-lg">Title</th>
                          <th className="p-3">Department</th>
                          <th className="p-3">Location</th>
                          <th className="p-3 rounded-tr-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobPositions.map((position, index) => (
                          <tr 
                            key={position.id} 
                            className={`border-b border-[#0021a7]/20 ${
                              index % 2 === 0 ? 'bg-black/20' : 'bg-black/40'
                            }`}
                          >
                            <td className="p-3">{position.title}</td>
                            <td className="p-3">
                              <span className="bg-[#00b8ff]/10 text-[#00b8ff] text-xs font-semibold px-2 py-1 rounded-full">
                                {position.department}
                              </span>
                            </td>
                            <td className="p-3">{position.location}</td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleEditPosition(position)}
                                  className="bg-[#0021a7]/70 hover:bg-[#0021a7] text-white px-2 py-1 rounded text-sm transition-colors flex items-center gap-1"
                                >
                                  <Edit className="h-3 w-3" /> Edit
                                </button>
                                <button 
                                  onClick={() => handleDeletePosition(position.id)}
                                  className="bg-red-600/70 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition-colors flex items-center gap-1"
                                >
                                  <Trash className="h-3 w-3" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {jobPositions.length === 0 && (
                          <tr>
                            <td colSpan={4} className="p-4 text-center text-white/70">
                              No job positions found. Create your first position!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {activeTab === 'positions' && isEditingPosition && (
                <>
                  <div className="mb-8">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">{editingPosition?.id === emptyJobPosition.id ? 'Create New Position' : 'Edit Position'}</h2>
                      <button 
                        onClick={() => setIsEditingPosition(false)}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); handleSavePosition(); }} className="space-y-6">
                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-2">Position Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={editingPosition?.title || ''}
                        onChange={(e) => setEditingPosition(prev => prev ? {...prev, title: e.target.value} : prev)}
                        className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Department */}
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium mb-2">Department</label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={editingPosition?.department || ''}
                        onChange={(e) => setEditingPosition(prev => prev ? {...prev, department: e.target.value} : prev)}
                        className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={editingPosition?.location || ''}
                        onChange={(e) => setEditingPosition(prev => prev ? {...prev, location: e.target.value} : prev)}
                        className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                        required
                        placeholder="e.g., London, UK (Hybrid)"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={editingPosition?.description || ''}
                        onChange={(e) => setEditingPosition(prev => prev ? {...prev, description: e.target.value} : prev)}
                        rows={3}
                        className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                        required
                      ></textarea>
                    </div>

                    {/* Requirements */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium">Key Requirements</label>
                        <button
                          type="button"
                          onClick={handleAddRequirement}
                          className="text-sm text-[#00b8ff] hover:text-[#0021a7] transition-colors flex items-center gap-1"
                        >
                          <Plus className="h-3 w-3" /> Add Requirement
                        </button>
                      </div>
                      <div className="space-y-2">
                        {editingPosition?.requirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={req}
                              onChange={(e) => handleUpdateRequirement(index, e.target.value)}
                              className="flex-1 p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                              placeholder="e.g., 3+ years experience in..."
                              required
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveRequirement(index)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors"
                              title="Remove requirement"
                            >
                              <Trash className="h-4 w-4 text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Icon */}
                    <div>
                      <label htmlFor="icon" className="block text-sm font-medium mb-2">Icon</label>
                      <select
                        id="icon"
                        name="icon"
                        value={editingPosition?.icon || 'Briefcase'}
                        onChange={(e) => setEditingPosition(prev => prev ? {...prev, icon: e.target.value} : prev)}
                        className="w-full p-3 bg-black/30 border border-[#0021a7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8ff] focus:border-transparent"
                      >
                        <option value="Briefcase">Briefcase</option>
                        <option value="Users">Users</option>
                        <option value="Lightbulb">Lightbulb</option>
                        <option value="Code">Code</option>
                        <option value="BarChart">Chart</option>
                        <option value="Megaphone">Marketing</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
                      >
                        {editingPosition?.id === emptyJobPosition.id ? 'Create Position' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {activeTab === 'applications' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Job Applications</h2>
                    <p className="text-white/60">Review and manage job applications</p>
                  </div>

                  {applications.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-lg">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 text-white/40" />
                      <p className="text-white/60">No job applications yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="px-4 py-3 text-left text-white/80">Applicant</th>
                            <th className="px-4 py-3 text-left text-white/80">Position</th>
                            <th className="px-4 py-3 text-left text-white/80">Experience</th>
                            <th className="px-4 py-3 text-left text-white/80">Submitted</th>
                            <th className="px-4 py-3 text-left text-white/80">Status</th>
                            <th className="px-4 py-3 text-left text-white/80">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map((application) => {
                            // Format date
                            const submittedDate = new Date(application.submittedAt);
                            const formattedDate = submittedDate.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            });
                            
                            // Status badge color
                            const getStatusBadge = (status: string) => {
                              switch (status) {
                                case 'new':
                                  return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs"><Clock className="h-3 w-3" /> New</span>;
                                case 'reviewed':
                                  return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs"><Clock className="h-3 w-3" /> Reviewed</span>;
                                case 'interviewing':
                                  return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs"><Users className="h-3 w-3" /> Interviewing</span>;
                                case 'hired':
                                  return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs"><CheckCircle className="h-3 w-3" /> Hired</span>;
                                case 'rejected':
                                  return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs"><XCircle className="h-3 w-3" /> Rejected</span>;
                                default:
                                  return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs">{status}</span>;
                              }
                            };
                            
                            return (
                              <tr key={application.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="px-4 py-4">
                                  <div>
                                    <div className="font-medium text-white">{application.fullName}</div>
                                    <div className="text-white/60 text-sm">{application.email}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-white/80">{application.position}</td>
                                <td className="px-4 py-4 text-white/80">{application.experience}</td>
                                <td className="px-4 py-4 text-white/60 text-sm">{formattedDate}</td>
                                <td className="px-4 py-4">{getStatusBadge(application.status)}</td>
                                <td className="px-4 py-4">
                                  <div className="flex space-x-2">
                                    <button 
                                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                                      title="Download CV"
                                    >
                                      <Download className="h-4 w-4" />
                                    </button>
                                    <Link 
                                      href={`/admin/applications/${application.id}`}
                                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                                      title="View Details"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                      </svg>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  )
} 