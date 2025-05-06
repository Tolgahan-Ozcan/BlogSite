import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { getValidationError, isValidEmail, isValidPassword, isValidName } from '../utils/validation';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors = {
      name: getValidationError('name', formData.name),
      email: getValidationError('email', formData.email),
      password: getValidationError('password', formData.password),
      confirmPassword: formData.confirmPassword !== formData.password
        ? 'Passwords do not match'
        : ''
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await register(formData.name, formData.email, formData.password);
      
      if (success) {
        toast.success('Registration successful!');
        navigate('/');
      } else {
        toast.error('Email already exists');
        setErrors({
          ...errors,
          email: 'Email is already registered'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pt-28 pb-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-serif font-bold text-slate-800">
                Create an Account
              </h1>
              <p className="text-slate-600 mt-2">
                Join our community to share your thoughts
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.name ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.email ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.password ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    At least 8 characters with 1 uppercase, 1 lowercase, and 1 number
                  </p>
                </div>
                
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-coral-500 hover:text-coral-600 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;