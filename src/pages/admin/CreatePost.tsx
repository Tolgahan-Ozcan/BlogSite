import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { X, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { createPost } from '../../services/api';
import { getValidationError, sanitizeText } from '../../utils/validation';

const categories = [
  'Technology',
  'Design',
  'Business',
  'Lifestyle',
  'Science',
  'Health',
  'Travel',
  'Food'
];

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    coverImage: '',
    tags: [] as string[]
  });
  
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    coverImage: '',
    tagInput: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    
    if (errors.tagInput) {
      setErrors({ ...errors, tagInput: '' });
    }
  };
  
  const handleAddTag = () => {
    const tag = tagInput.trim();
    
    if (!tag) {
      setErrors({ ...errors, tagInput: 'Tag cannot be empty' });
      return;
    }
    
    if (formData.tags.includes(tag)) {
      setErrors({ ...errors, tagInput: 'Tag already exists' });
      return;
    }
    
    setFormData({ ...formData, tags: [...formData.tags, tag] });
    setTagInput('');
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove)
    });
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const validateForm = () => {
    const newErrors = {
      title: getValidationError('title', formData.title),
      excerpt: formData.excerpt ? '' : 'Excerpt is required',
      content: getValidationError('content', formData.content),
      category: formData.category ? '' : 'Category is required',
      coverImage: formData.coverImage ? '' : 'Cover image URL is required',
      tagInput: ''
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    if (!user) {
      toast.error('You must be logged in to create a post');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Sanitize text inputs
      const sanitizedData = {
        ...formData,
        title: sanitizeText(formData.title),
        excerpt: sanitizeText(formData.excerpt),
        content: formData.content, // Don't sanitize content as it may contain markdown
        author: user
      };
      
      const newPost = await createPost(sanitizedData, user);
      
      if (newPost) {
        toast.success('Post created successfully!');
        navigate(`/blog/${newPost.id}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-8 text-slate-800">
            Create New Post
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.title ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>
                
                {/* Excerpt */}
                <div>
                  <label
                    htmlFor="excerpt"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Excerpt <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary of your post"
                    rows={2}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.excerpt ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                  />
                  {errors.excerpt && (
                    <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
                  )}
                </div>
                
                {/* Content */}
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your post content here (supports Markdown)"
                    rows={12}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.content ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent font-mono`}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    Markdown formatting is supported (## for headings, * for lists, etc.)
                  </p>
                </div>
                
                {/* Category & Cover Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${
                        errors.category ? 'border-red-500' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                    )}
                  </div>
                  
                  <div>
                    <label
                      htmlFor="coverImage"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Cover Image URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      id="coverImage"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className={`w-full px-4 py-2 rounded-md border ${
                        errors.coverImage ? 'border-red-500' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                    />
                    {errors.coverImage && (
                      <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
                    )}
                  </div>
                </div>
                
                {/* Cover Image Preview */}
                {formData.coverImage && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Cover Image Preview:</p>
                    <div className="h-40 rounded-md overflow-hidden bg-slate-100">
                      <img
                        src={formData.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Tags */}
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Tags
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="tags"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagKeyDown}
                      placeholder="Add a tag and press Enter"
                      className={`flex-1 px-4 py-2 rounded-l-md border ${
                        errors.tagInput ? 'border-red-500' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-slate-800 text-white rounded-r-md hover:bg-slate-700 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  {errors.tagInput && (
                    <p className="text-red-500 text-sm mt-1">{errors.tagInput}</p>
                  )}
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tags.map((tag) => (
                        <div
                          key={tag}
                          className="inline-flex items-center bg-slate-100 text-slate-800 rounded-full px-3 py-1 text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-slate-500 hover:text-slate-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/posts')}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;