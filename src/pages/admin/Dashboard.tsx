import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  User, 
  MessageCircle, 
  Plus, 
  Edit, 
  Trash, 
  ChevronRight 
} from 'lucide-react';
import { getPosts } from '../../services/api';
import type { Post } from '../../services/api';

const AdminDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Calculate statistics
  const totalPosts = posts.length;
  const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);
  const uniqueAuthors = new Set(posts.map((post) => post.author.id)).size;
  
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
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h1 className="text-3xl font-serif font-bold text-slate-800 mb-4 md:mb-0">
              Admin Dashboard
            </h1>
            <Link
              to="/admin/posts/create"
              className="inline-flex items-center px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors"
            >
              <Plus size={18} className="mr-1" />
              New Post
            </Link>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 mr-4">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Total Posts</p>
                <p className="text-2xl font-bold text-slate-800">{totalPosts}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 mr-4">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Total Comments</p>
                <p className="text-2xl font-bold text-slate-800">{totalComments}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 mr-4">
                <User size={20} />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Authors</p>
                <p className="text-2xl font-bold text-slate-800">{uniqueAuthors}</p>
              </div>
            </div>
          </div>
          
          {/* Recent Posts */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h2 className="text-xl font-medium text-slate-800">Recent Posts</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="mb-4 md:mb-0 md:mr-4">
                    <h3 className="text-lg font-medium text-slate-800 mb-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-slate-500 text-sm">
                      <span className="inline-block bg-slate-100 text-slate-700 rounded-full px-2 py-1 text-xs mr-2">
                        {post.category}
                      </span>
                      <span className="mr-2">•</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.comments.length} comments</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
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
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
              <Link
                to="/admin/posts"
                className="text-coral-500 hover:text-coral-600 font-medium inline-flex items-center"
              >
                View All Posts <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <h2 className="text-xl font-medium text-slate-800">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  to="/admin/posts/create"
                  className="block p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-coral-100 text-coral-600 mr-4">
                      <Plus size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Create New Post</p>
                      <p className="text-sm text-slate-500">Add a new article to your blog</p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/blog"
                  className="block p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 mr-4">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">View Blog</p>
                      <p className="text-sm text-slate-500">See your blog as visitors do</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <h2 className="text-xl font-medium text-slate-800">Tips</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <div className="text-coral-500 mr-2">•</div>
                    <p>Use tags to help readers find related content</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-coral-500 mr-2">•</div>
                    <p>Add a compelling excerpt to encourage clicks</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-coral-500 mr-2">•</div>
                    <p>Choose high-quality images for your featured photos</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-coral-500 mr-2">•</div>
                    <p>Respond to comments to build community engagement</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;