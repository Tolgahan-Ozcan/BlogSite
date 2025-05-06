import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash, ChevronRight, Search } from 'lucide-react';
import { getPosts, deletePost } from '../../services/api';
import type { Post } from '../../services/api';

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        
        // Extract unique categories
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
    // Filter posts based on search term and category
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
  
  const handleDeletePost = async (id: string) => {
    if (isDeleting) return;
    
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setIsDeleting(true);
      
      try {
        const success = await deletePost(id);
        
        if (success) {
          // Filter out the deleted post
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
          toast.success('Post deleted successfully');
        } else {
          toast.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Something went wrong. Please try again.');
      } finally {
        setIsDeleting(false);
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
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h1 className="text-3xl font-serif font-bold text-slate-800 mb-4 md:mb-0">
              Manage Posts
            </h1>
            <Link
              to="/admin/posts/create"
              className="inline-flex items-center px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors"
            >
              <Plus size={18} className="mr-1" />
              New Post
            </Link>
          </div>
          
          {/* Search & Filter */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
                      className="px-3 py-2 rounded-md text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Posts Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Comments
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                className="h-10 w-10 object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-800">{post.title}</div>
                              <div className="text-sm text-slate-500 truncate max-w-xs">
                                {post.excerpt.substring(0, 60)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-block bg-slate-100 text-slate-700 rounded-full px-2 py-1 text-xs">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {post.comments.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-3">
                            <Link
                              to={`/blog/${post.id}`}
                              className="text-slate-500 hover:text-slate-700 transition-colors"
                              title="View"
                            >
                              <ChevronRight size={18} />
                            </Link>
                            <Link
                              to={`/admin/posts/edit/${post.id}`}
                              className="text-blue-500 hover:text-blue-700 transition-colors"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title="Delete"
                              disabled={isDeleting}
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <p className="text-slate-500 mb-2">No posts found</p>
                        <p className="text-slate-400 text-sm">
                          Try adjusting your search or filter criteria
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;