import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Clock, Tag, Plus, Trash } from 'lucide-react';
import { getPosts, deletePost } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import type { Post } from '../services/api';

const Blog = () => {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        
        const uniqueCategories = Array.from(
          new Set(allPosts.map((post) => post.category))
        );
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  useEffect(() => {
    let results = posts;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.content.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }
    
    if (selectedCategory) {
      results = results.filter((post) => post.category === selectedCategory);
    }
    
    setFilteredPosts(results);
  }, [searchTerm, selectedCategory, posts]);
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        const success = await deletePost(postId);
        if (success) {
          setPosts(posts.filter(post => post.id !== postId));
          toast.success('Post deleted successfully');
        } else {
          toast.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('An error occurred while deleting the post');
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral-500"></div>
      </div>
    );
  }
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-serif text-4xl font-bold mb-4 text-slate-800">
            The <span className="text-coral-500">Blog</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Discover insights, tutorials, and thought-provoking articles from our community.
          </p>
          
          {/* Admin Create Post Button */}
          {isAdmin && (
            <Link
              to="/admin/posts/create"
              className="inline-flex items-center px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors mb-8"
            >
              <Plus size={20} className="mr-2" />
              Create New Post
            </Link>
          )}
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-coral-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>
        
        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link to={`/blog/${post.id}`} className="block h-48 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <h2 className="text-xl font-serif font-bold mb-3 hover:text-coral-500 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Post Meta */}
                  <div className="flex items-center text-slate-500 text-xs mb-4">
                    <Clock size={14} className="mr-1" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <Tag size={14} className="mr-1" />
                    <span>{post.tags.slice(0, 2).join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {post.author.name.charAt(0)}
                      </div>
                      <p className="ml-2 text-xs font-medium">{post.author.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-coral-500 hover:text-coral-600 text-sm font-medium"
                      >
                        Read <ChevronRight size={14} className="ml-1" />
                      </Link>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                          title="Delete post"
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-slate-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;