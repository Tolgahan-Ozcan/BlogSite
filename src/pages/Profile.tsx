import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Simulate API delay
    setTimeout(() => {
      logout();
      toast.success('Logged out successfully');
      navigate('/');
      setIsLoggingOut(false);
    }, 500);
  };
  
  if (!user) {
    return (
      <div className="pt-32 pb-16 text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }
  
  return (
    <div className="pt-28 pb-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-8 text-slate-800">
            Your Profile
          </h1>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-2xl">
                  {user.name.charAt(0)}
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-medium text-slate-800">{user.name}</h2>
                  <p className="text-slate-500">{user.email}</p>
                  <p className="mt-1 inline-block px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-medium mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-slate-500">Name</div>
                    <div className="col-span-2 text-sm text-slate-800">{user.name}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-slate-500">Email</div>
                    <div className="col-span-2 text-sm text-slate-800">{user.email}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-slate-500">Role</div>
                    <div className="col-span-2 text-sm text-slate-800 capitalize">{user.role}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-slate-500">Member Since</div>
                    <div className="col-span-2 text-sm text-slate-800">
                      {new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-8">
              <h3 className="text-lg font-medium mb-6">Account Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Email Preferences</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        className="h-4 w-4 text-coral-500 focus:ring-coral-500 border-slate-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="newsletter" className="ml-2 block text-sm text-slate-700">
                        Receive newsletter
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="marketing"
                        name="marketing"
                        type="checkbox"
                        className="h-4 w-4 text-coral-500 focus:ring-coral-500 border-slate-300 rounded"
                      />
                      <label htmlFor="marketing" className="ml-2 block text-sm text-slate-700">
                        Receive marketing emails
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 text-coral-500 focus:ring-coral-500 border-slate-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="comments" className="ml-2 block text-sm text-slate-700">
                        Email me when someone comments on my posts
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
              <p className="text-slate-600 text-sm mb-6">
                Once you log out, you'll need to sign in again to access your account.
              </p>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-70"
              >
                {isLoggingOut ? 'Logging Out...' : 'Log Out'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;