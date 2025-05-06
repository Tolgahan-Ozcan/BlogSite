import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-24">
      <div className="text-center">
        <h1 className="text-9xl font-serif font-bold text-slate-800">404</h1>
        <div className="h-2 w-24 bg-coral-500 mx-auto my-6"></div>
        <h2 className="text-3xl font-serif font-bold mb-4 text-slate-700">Page Not Found</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors"
        >
          <Home size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;