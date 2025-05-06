import { User } from '../contexts/AuthContext';

// Types
export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
  };
  content: string;
  createdAt: string;
};

// Sample blog posts data
const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React in 2025',
    excerpt: 'React has evolved significantly over the years. This guide will help you get started with the latest features and best practices in 2025.',
    content: `
      # Getting Started with React in 2025

      React has evolved significantly over the years, and the ecosystem in 2025 looks quite different from what it was before. With the introduction of React Server Components, the new React compiler, and improved concurrent features, getting started with React today involves understanding these new concepts.

      ## Setting Up Your Environment

      The easiest way to start a new React project is still using create-react-app or Vite. Vite has become increasingly popular due to its speed and developer experience.

      \`\`\`bash
      npm create vite@latest my-react-app -- --template react-ts
      cd my-react-app
      npm install
      npm run dev
      \`\`\`

      ## Understanding Modern React

      The mental model for React has shifted from class components to functional components with hooks. The most common hooks you'll use are:

      - useState for local component state
      - useEffect for side effects
      - useContext for context API
      - useRef for mutable references
      - useMemo and useCallback for performance optimizations

      ## Building Your First Component

      Here's a simple counter component using modern React:

      \`\`\`jsx
      import { useState } from 'react';

      function Counter() {
        const [count, setCount] = useState(0);
        
        return (
          <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        );
      }
      \`\`\`

      ## Next Steps

      From here, you can explore:
      
      1. React Router for navigation
      2. State management with Context API or libraries like Redux Toolkit
      3. Styling with CSS-in-JS libraries or Tailwind CSS
      4. Form handling with React Hook Form
      5. Data fetching with React Query or SWR

      The React ecosystem continues to grow, but the core principles remain the same: compose your UI with components, manage state appropriately, and leverage the declarative nature of React to build user interfaces.
    `,
    author: {
      id: '1',
      name: 'Admin User'
    },
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Web Development'],
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2025-01-15T12:00:00Z',
    updatedAt: '2025-01-15T12:00:00Z',
    comments: [
      {
        id: '101',
        postId: '1',
        author: {
          id: '2',
          name: 'Regular User'
        },
        content: 'This was really helpful, especially the part about the new React compiler!',
        createdAt: '2025-01-16T08:12:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'The Future of AI in Web Development',
    excerpt: 'Artificial intelligence is transforming how we build websites and web applications. Learn how AI is being integrated into modern web development workflows.',
    content: `
      # The Future of AI in Web Development

      Artificial intelligence has made significant inroads into web development in recent years. From code generation to design assistance, AI tools are transforming how developers work.

      ## Code Generation

      AI-powered code generators like GitHub Copilot and similar tools have become indispensable for many developers. These tools can:

      - Suggest code completions based on context
      - Generate entire functions from comments
      - Help with debugging and problem-solving
      - Translate between programming languages

      ## Design and UI Generation

      AI has also revolutionized the design aspect of web development:

      - Tools can generate entire UI layouts from rough sketches
      - Design systems can be automatically created based on a few key components
      - Color schemes and typography can be optimized for accessibility
      - User flows can be analyzed and improved automatically

      ## Performance Optimization

      AI algorithms are now being used to:

      - Analyze and optimize bundle sizes
      - Predict and prefetch resources based on user behavior
      - Automatically optimize images and media
      - Suggest code refactoring for performance gains

      ## The Human Element

      Despite these advances, human developers remain essential. AI tools are best viewed as collaborators that handle routine tasks and provide suggestions, freeing humans to focus on:

      - Complex architectural decisions
      - Business logic and domain-specific challenges
      - User experience design
      - Ethical considerations and accessibility

      ## Getting Started with AI Tools

      If you're looking to incorporate AI into your development workflow, consider starting with:

      1. GitHub Copilot or similar code assistants
      2. AI-powered design tools like Figma's AI features
      3. Automated testing and QA tools
      4. Performance optimization assistants

      The future of web development will increasingly involve collaboration between human developers and AI assistants, creating a new paradigm for how we build for the web.
    `,
    author: {
      id: '1',
      name: 'Admin User'
    },
    category: 'Technology',
    tags: ['AI', 'Web Development', 'Future Tech'],
    coverImage: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2025-01-05T14:30:00Z',
    updatedAt: '2025-01-06T09:15:00Z',
    comments: []
  },
  {
    id: '3',
    title: 'Sustainable Web Design Principles',
    excerpt: 'The environmental impact of websites is often overlooked. Learn how to design and build websites that are both beautiful and environmentally friendly.',
    content: `
      # Sustainable Web Design Principles

      As the web grows, so does its environmental footprint. Data centers, network infrastructure, and the devices we use to access the internet all consume energy and produce carbon emissions. Sustainable web design aims to reduce this impact.

      ## Efficient Code

      One of the most effective ways to make a website more sustainable is to optimize its performance:

      - Minimize JavaScript execution time
      - Reduce CSS complexity
      - Implement efficient algorithms
      - Use appropriate data structures
      - Avoid unnecessary computations

      ## Image and Media Optimization

      Media files often make up the majority of a webpage's size:

      - Compress images appropriately
      - Use modern formats like WebP and AVIF
      - Implement responsive images
      - Consider if images are necessary at all
      - Avoid auto-playing videos

      ## Sustainable Hosting

      Where and how your website is hosted matters:

      - Choose hosting providers that use renewable energy
      - Consider edge computing to reduce data travel distances
      - Implement effective caching strategies
      - Use CDNs powered by clean energy

      ## Designing for Longevity

      Sustainable websites are built to last:

      - Use timeless design principles
      - Build with accessible, semantic HTML
      - Create modular systems that can evolve
      - Document your code thoroughly
      - Plan for future technological changes

      ## Measuring Impact

      You can't improve what you don't measure:

      - Use tools like Website Carbon Calculator
      - Monitor performance metrics over time
      - Set sustainability goals for your projects
      - Consider getting environmental certifications

      ## Next Steps

      To start implementing sustainable web design:

      1. Audit your existing websites for inefficiencies
      2. Include sustainability in your design process from the beginning
      3. Educate clients and stakeholders about the importance of sustainable design
      4. Join communities focused on sustainable web development

      Building sustainable websites isn't just good for the planet—it often results in better user experiences, as sustainable sites tend to be faster, more accessible, and more future-proof.
    `,
    author: {
      id: '1',
      name: 'Admin User'
    },
    category: 'Design',
    tags: ['Web Design', 'Sustainability', 'Performance'],
    coverImage: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2025-02-10T10:45:00Z',
    updatedAt: '2025-02-10T10:45:00Z',
    comments: [
      {
        id: '102',
        postId: '3',
        author: {
          id: '2',
          name: 'Regular User'
        },
        content: 'I never considered the environmental impact of my websites before. This was eye-opening!',
        createdAt: '2025-02-11T15:23:00Z'
      },
      {
        id: '103',
        postId: '3',
        author: {
          id: '1',
          name: 'Admin User'
        },
        content: 'Thanks! It\'s definitely becoming more important as the web grows.',
        createdAt: '2025-02-11T16:05:00Z'
      }
    ]
  }
];

// Helper functions for localStorage persistence
const getStoredPosts = (): Post[] => {
  const stored = localStorage.getItem('blog_posts');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored posts', e);
    }
  }
  // Initialize with sample data if nothing is stored
  localStorage.setItem('blog_posts', JSON.stringify(SAMPLE_POSTS));
  return SAMPLE_POSTS;
};

const storePosts = (posts: Post[]): void => {
  localStorage.setItem('blog_posts', JSON.stringify(posts));
};

// API functions

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStoredPosts());
    }, 500);
  });
};

// Get a single post by ID
export const getPost = async (id: string): Promise<Post | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = getStoredPosts().find((p) => p.id === id) || null;
      resolve(post);
    }, 300);
  });
};

// Create a new post
export const createPost = async (
  postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'comments'>,
  user: User
): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = getStoredPosts();
      const newPost: Post = {
        id: Date.now().toString(),
        ...postData,
        author: {
          id: user.id,
          name: user.name
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: []
      };
      
      const updatedPosts = [newPost, ...posts];
      storePosts(updatedPosts);
      resolve(newPost);
    }, 500);
  });
};

// Update an existing post
export const updatePost = async (
  id: string,
  postData: Partial<Omit<Post, 'id' | 'createdAt' | 'comments' | 'author'>>
): Promise<Post | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = getStoredPosts();
      const postIndex = posts.findIndex((p) => p.id === id);
      
      if (postIndex === -1) {
        resolve(null);
        return;
      }
      
      const updatedPost = {
        ...posts[postIndex],
        ...postData,
        updatedAt: new Date().toISOString()
      };
      
      posts[postIndex] = updatedPost;
      storePosts(posts);
      resolve(updatedPost);
    }, 500);
  });
};

// Delete a post
export const deletePost = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = getStoredPosts();
      const updatedPosts = posts.filter((p) => p.id !== id);
      
      if (updatedPosts.length === posts.length) {
        resolve(false);
        return;
      }
      
      storePosts(updatedPosts);
      resolve(true);
    }, 500);
  });
};

// Add a comment to a post
export const addComment = async (
  postId: string,
  content: string,
  user: User
): Promise<Comment | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = getStoredPosts();
      const postIndex = posts.findIndex((p) => p.id === postId);
      
      if (postIndex === -1) {
        resolve(null);
        return;
      }
      
      const newComment: Comment = {
        id: Date.now().toString(),
        postId,
        author: {
          id: user.id,
          name: user.name
        },
        content,
        createdAt: new Date().toISOString()
      };
      
      posts[postIndex].comments.push(newComment);
      storePosts(posts);
      resolve(newComment);
    }, 300);
  });
};

// Delete a comment
export const deleteComment = async (postId: string, commentId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = getStoredPosts();
      const postIndex = posts.findIndex((p) => p.id === postId);
      
      if (postIndex === -1) {
        resolve(false);
        return;
      }
      
      const updatedComments = posts[postIndex].comments.filter(
        (c) => c.id !== commentId
      );
      
      if (updatedComments.length === posts[postIndex].comments.length) {
        resolve(false);
        return;
      }
      
      posts[postIndex].comments = updatedComments;
      storePosts(posts);
      resolve(true);
    }, 300);
  });
};