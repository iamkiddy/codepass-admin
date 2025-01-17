'use client';

import { Bell, Search, Settings, Menu } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthProvider';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter } from 'next/navigation';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  const handleSettingsClick = () => {
    router.push('/settings');
  };

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
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left - Current Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden rounded-md p-2 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
          <h1 className="text-lg md:text-xl font-bold text-primaryColor">
            {getCurrentSection()}
          </h1>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 justify-center max-w-2xl px-4">
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
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              type="button"
              onClick={handleSettingsClick}
              className={`rounded-full p-2 hover:bg-gray-100 transition-colors ${
                pathname.startsWith('/settings') ? 'text-primaryColor bg-primaryColor/10' : 'text-gray-500'
              }`}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
          
          {/* Profile - Full on desktop, avatar only on mobile */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primaryColor flex items-center justify-center text-white">
                <span className="text-sm font-medium">
                  {user?.fullname?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.fullname}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}