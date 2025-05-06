import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getPosts } from '../services/api';
import type { Post } from '../services/api';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        
        // Get the first post as featured
        setFeaturedPosts(allPosts.slice(0, 1));
        
        // Get the next 4 posts as recent
        setRecentPosts(allPosts.slice(1, 5));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Insights, Stories, and Ideas <span className="text-coral-400">Worth Sharing</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Explore thought-provoking articles on technology, design, business, and more from our community of writers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/blog"
                className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors font-medium"
              >
                Start Reading
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 border border-white hover:bg-white hover:text-slate-900 rounded-md transition-colors font-medium"
              >
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-10 text-center">
              Featured <span className="text-coral-500">Post</span>
            </h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3 relative overflow-hidden rounded-xl h-80 md:h-auto">
                  <img
                    src={featuredPosts[0].coverImage}
                    alt={featuredPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {featuredPosts[0].category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                    {featuredPosts[0].title}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {featuredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold">
                        {featuredPosts[0].author.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{featuredPosts[0].author.name}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(featuredPosts[0].createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${featuredPosts[0].id}`}
                      className="inline-flex items-center text-coral-500 hover:text-coral-600 font-medium"
                    >
                      Read More <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-10 text-center">
              Recent <span className="text-coral-500">Articles</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {post.author.name.charAt(0)}
                        </div>
                        <p className="ml-2 text-xs font-medium">{post.author.name}</p>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-coral-500 hover:text-coral-600 text-sm font-medium"
                      >
                        Read <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors font-medium"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-16 bg-coral-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Join Our Writing Community
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Share your insights, experiences, and expertise with readers around the world.
            </p>
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-white text-coral-500 hover:bg-slate-100 rounded-md transition-colors font-medium"
            >
              Start Writing Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;