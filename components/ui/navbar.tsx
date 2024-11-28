'use client';

import { Bell, Search, Settings } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthProvider';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const getCurrentSection = () => {
    const path = pathname.split('/')[1];
    switch(path) {
      case 'home':
        return 'Dashboard';
      case 'events':
        return 'Events';
      case 'blog':
        return 'Blog';
      case 'banner':
        return 'Banners';
      case 'faq':
        return 'FAQ';
      case 'category':
        return 'Categories';
      case 'user':
        return 'Users';
      case 'event-type':
        return 'Event Types';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-8">
        {/* Left - Current Section */}
        <div className="flex-none">
          <h1 className="text-xl font-bold text-primaryColor">
            {getCurrentSection()}
          </h1>
        </div>

        {/* Center - Search */}
        <div className="flex-1 flex justify-center max-w-2xl px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-gray-100 pl-10 focus:bg-white rounded-full border-0 focus:ring-2 focus:ring-primaryColor/20"
            />
          </div>
        </div>

        {/* Right - Icons and Profile */}
        <div className="flex-none flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 hover:bg-gray-100 transition-colors relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-secondaryColor rounded-full"></span>
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100 transition-colors">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primaryColor flex items-center justify-center text-white">
                <span className="text-sm font-medium">
                  {user?.fullname?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.fullname}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}