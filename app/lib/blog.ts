// Blog post interface
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  readTime: string;
  published: boolean;
}

// Sample blog posts data (in a real app, this would come from a database)
export const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Leveraging AI for Business Growth in 2024',
    excerpt: 'Discover how artificial intelligence is transforming business operations and creating new opportunities for growth.',
    content: 'Full content of the article goes here...',
    date: 'May 15, 2024',
    author: 'Tony Nguyen',
    category: 'Technology',
    imageUrl: '/images/header.png',
    readTime: '5 min read',
    published: true
  },
  {
    id: 2,
    title: 'The Future of Web Development: What to Expect',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development and how they can benefit your business.',
    content: 'Full content of the article goes here...',
    date: 'May 10, 2024',
    author: 'Linh Tran',
    category: 'Web Development',
    imageUrl: '/images/header.png',
    readTime: '7 min read',
    published: true
  },
  {
    id: 3,
    title: 'Building a Strong Digital Brand Presence',
    excerpt: 'Learn effective strategies to enhance your brand awareness and establish a powerful digital presence in today\'s competitive market.',
    content: 'Full content of the article goes here...',
    date: 'May 5, 2024',
    author: 'Minh Pham',
    category: 'Branding',
    imageUrl: '/images/header.png',
    readTime: '6 min read',
    published: true
  },
  {
    id: 4,
    title: 'E-commerce Optimization Techniques for Higher Conversion',
    excerpt: 'Implement these proven optimization techniques to boost your e-commerce conversion rates and drive more sales.',
    content: 'Full content of the article goes here...',
    date: 'April 28, 2024',
    author: 'Hoa Nguyen',
    category: 'E-commerce',
    imageUrl: '/images/header.png',
    readTime: '8 min read',
    published: true
  },
  {
    id: 5,
    title: 'Data-Driven Marketing: Making Informed Decisions',
    excerpt: 'Harness the power of data analytics to make informed marketing decisions and achieve better ROI on your campaigns.',
    content: 'Full content of the article goes here...',
    date: 'April 20, 2024',
    author: 'Tuan Le',
    category: 'Marketing',
    imageUrl: '/images/header.png',
    readTime: '5 min read',
    published: true
  },
  {
    id: 6,
    title: 'Cybersecurity Best Practices for Small Businesses',
    excerpt: 'Protect your business from cyber threats with these essential security practices designed for small to medium enterprises.',
    content: 'Full content of the article goes here...',
    date: 'April 15, 2024',
    author: 'Lan Vo',
    category: 'Security',
    imageUrl: '/images/header.png',
    readTime: '6 min read',
    published: true
  }
];

// Available categories
export const categories = ['Technology', 'Web Development', 'Marketing', 'Branding', 'E-commerce', 'Security'];

// In a real application, these functions would interact with a database
// For this demo, we'll use localStorage to persist data between pages

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  if (typeof window !== 'undefined') {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      return JSON.parse(storedPosts);
    }
  }
  return initialBlogPosts;
}

// Get published blog posts only
export function getPublishedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.published);
}

// Get a single blog post by ID
export function getBlogPostById(id: number): BlogPost | undefined {
  return getAllBlogPosts().find(post => post.id === id);
}

// Save all blog posts
export function saveBlogPosts(posts: BlogPost[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }
}

// Add or update a blog post
export function saveBlogPost(post: BlogPost): void {
  const posts = getAllBlogPosts();
  const existingIndex = posts.findIndex(p => p.id === post.id);
  
  if (existingIndex >= 0) {
    // Update existing post
    posts[existingIndex] = post;
  } else {
    // Add new post
    posts.push(post);
  }
  
  saveBlogPosts(posts);
}

// Delete a blog post
export function deleteBlogPost(id: number): void {
  const posts = getAllBlogPosts().filter(post => post.id !== id);
  saveBlogPosts(posts);
}

// Calculate read time based on content length
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
} 