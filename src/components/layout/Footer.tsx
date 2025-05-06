import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif font-bold mb-4">
              Prism<span className="text-coral-400">Blog</span>
            </h2>
            <p className="text-slate-300 mb-4">
              Sharing thoughts, ideas, and stories that matter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-coral-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-coral-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-coral-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-coral-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-coral-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-300 hover:text-coral-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-300 hover:text-coral-400 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-300 hover:text-coral-400 transition-colors">Register</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-coral-400 transition-colors">Technology</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-coral-400 transition-colors">Design</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-coral-400 transition-colors">Business</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-coral-400 transition-colors">Lifestyle</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-coral-400 transition-colors">Science</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Subscribe</h3>
            <p className="text-slate-300 mb-4">Get the latest posts delivered to your inbox.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-coral-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-coral-500 hover:bg-coral-600 text-white py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-coral-400"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            &copy; {currentYear} PrismBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;