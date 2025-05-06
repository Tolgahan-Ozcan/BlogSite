import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Edit, Clock, MessageCircle, Tag, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getPost, addComment, deleteComment } from '../services/api';
import { sanitizeText, isValidText } from '../utils/validation';
import type { Post } from '../services/api';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const postData = await getPost(id);
        setPost(postData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      return;
    }
    
    if (!isValidText(comment)) {
      setCommentError('Comment must be at least 2 characters');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (post && id) {
        const sanitizedComment = sanitizeText(comment);
        const newComment = await addComment(id, sanitizedComment, user);
        
        if (newComment) {
          // Update post with new comment
          setPost((prevPost) => {
            if (!prevPost) return null;
            
            return {
              ...prevPost,
              comments: [...prevPost.comments, newComment]
            };
          });
          
          setComment('');
          setCommentError('');
        }
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteComment = async (commentId: string) => {
    if (!post || !id) return;
    
    try {
      const success = await deleteComment(id, commentId);
      
      if (success) {
        // Update post without the deleted comment
        setPost((prevPost) => {
          if (!prevPost) return null;
          
          return {
            ...prevPost,
            comments: prevPost.comments.filter((c) => c.id !== commentId)
          };
        });
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral-500"></div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-coral-500 hover:text-coral-600">
          Return to blog
        </Link>
      </div>
    );
  }
  
  // Function to convert Markdown headers to HTML
  const renderPostContent = () => {
    let content = post.content;
    
    // Convert Markdown headers to HTML
    content = content.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>');
    content = content.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-4">$1</h2>');
    content = content.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-3">$1</h3>');
    
    // Convert Markdown paragraphs to HTML
    content = content.replace(/^(?!<h[1-6]|```)(.*$)/gm, function(match) {
      if (match.trim() === '') return '<br>';
      return '<p class="my-3">' + match + '</p>';
    });
    
    // Convert Markdown code blocks to HTML
    content = content.replace(/```([^`]+)```/g, '<pre class="bg-slate-100 p-4 rounded-md my-4 overflow-x-auto text-sm"><code>$1</code></pre>');
    
    // Convert Markdown code inline to HTML
    content = content.replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1 rounded text-sm">$1</code>');
    
    // Convert Markdown lists to HTML
    content = content.replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal my-1">$1</li>');
    content = content.replace(/^- (.*$)/gm, '<li class="ml-6 list-disc my-1">$1</li>');
    
    return content;
  };
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center text-slate-600 hover:text-coral-500 mb-6"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to all articles
          </Link>
          
          {/* Post Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              {post.title}
            </h1>
            
            {/* Post Meta */}
            <div className="flex flex-wrap items-center text-slate-500 text-sm gap-4">
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <MessageCircle size={16} className="mr-1" />
                <span>{post.comments.length} comments</span>
              </div>
            </div>
            
            {/* Admin Edit Button */}
            {isAdmin && (
              <div className="mt-4">
                <Link
                  to={`/admin/posts/edit/${post.id}`}
                  className="inline-flex items-center text-sm bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-700 transition-colors"
                >
                  <Edit size={14} className="mr-1" />
                  Edit Post
                </Link>
              </div>
            )}
          </header>
          
          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Post Content */}
          <article className="prose max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: renderPostContent() }} />
          </article>
          
          {/* Tags */}
          <div className="mb-12">
            <div className="flex items-center flex-wrap gap-2">
              <Tag size={16} className="text-slate-500" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Comments Section */}
          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-serif font-bold mb-6">
              Comments ({post.comments.length})
            </h2>
            
            {/* Comment Form */}
            {isAuthenticated ? (
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Leave a comment
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={`w-full px-4 py-2 rounded-md border ${
                      commentError ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                    placeholder="Share your thoughts..."
                  ></textarea>
                  {commentError && (
                    <p className="text-red-500 text-sm mt-1">{commentError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            ) : (
              <div className="bg-slate-50 p-4 rounded-md mb-8">
                <p className="text-slate-600">
                  Please{' '}
                  <Link to="/login" className="text-coral-500 hover:text-coral-600">
                    log in
                  </Link>{' '}
                  to leave a comment.
                </p>
              </div>
            )}
            
            {/* Comments List */}
            <div className="space-y-6">
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-4 rounded-md border border-slate-200">
                    <div className="flex justify-between">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {comment.author.name.charAt(0)}
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium">{comment.author.name}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      {/* Delete button for admins or comment author */}
                      {(isAdmin || (user && user.id === comment.author.id)) && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-slate-500 hover:text-red-500 text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-slate-700 text-sm mt-2">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;