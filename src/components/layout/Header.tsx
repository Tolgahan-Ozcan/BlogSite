import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header 
      className={`fixed w-full z-30 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-serif font-bold text-slate-800 transition-colors"
          >
            Prism<span className="text-coral-500">Blog</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-coral-500 ${
                location.pathname === '/' ? 'text-coral-500' : 'text-slate-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium transition-colors hover:text-coral-500 ${
                location.pathname === '/blog' ? 'text-coral-500' : 'text-slate-700'
              }`}
            >
              Blog
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors hover:text-coral-500 ${
                  location.pathname.includes('/admin') ? 'text-coral-500' : 'text-slate-700'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>
          
          {/* Auth Buttons & Search for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="text-slate-600 hover:text-coral-500 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-slate-700 hover:text-coral-500 transition-colors">
                  <User size={20} />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 invisible group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                  <div className="py-2">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-slate-700 hover:text-coral-500 transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 px-4 py-2 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 z-20">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`text-base font-medium transition-colors ${
                location.pathname === '/' ? 'text-coral-500' : 'text-slate-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className={`text-base font-medium transition-colors ${
                location.pathname === '/blog' ? 'text-coral-500' : 'text-slate-700'
              }`}
            >
              Blog
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`text-base font-medium transition-colors ${
                  location.pathname.includes('/admin') ? 'text-coral-500' : 'text-slate-700'
                }`}
              >
                Admin
              </Link>
            )}
            
            <div className="pt-3 border-t border-slate-200">
              {user ? (
                <>
                  <div className="mb-3">
                    <span className="text-sm text-slate-500">Signed in as:</span>
                    <div className="text-base font-medium text-slate-700">{user.name}</div>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block text-base font-medium text-slate-700 hover:text-coral-500 transition-colors mb-3"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-base font-medium text-slate-700 hover:text-coral-500 transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link 
                    to="/login" 
                    className="text-base font-medium text-slate-700 hover:text-coral-500 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-base font-medium bg-slate-800 text-white hover:bg-slate-700 px-4 py-2 rounded-md transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;