import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { getValidationError, isValidEmail } from '../utils/validation';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
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
      email: getValidationError('email', formData.email),
      password: formData.password ? '' : 'Password is required'
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
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
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
                Welcome Back
              </h1>
              <p className="text-slate-600 mt-2">
                Sign in to your account to continue
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
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
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-coral-500 focus:ring-coral-500 border-slate-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-slate-700"
                    >
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-coral-500 hover:text-coral-600 font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-coral-500 hover:text-coral-600 font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="text-sm text-slate-500 text-center">
                <p className="mb-2">Demo accounts:</p>
                <p>Admin: admin@example.com / admin123</p>
                <p>User: user@example.com / user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;