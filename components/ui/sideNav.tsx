'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Image, 
  HelpCircle, 
  Users, 
  FolderTree,
  LogOut,
  FileText
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthProvider';
import { cn } from '@/lib/utils';

const navigation = {
  general: [
    { name: 'Dashboard', href: '/home', icon: LayoutDashboard },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'Users', href: '/user', icon: Users },
  ],
  utilities: [
    { name: 'Banners', href: '/banner', icon: Image },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Categories', href: '/category', icon: FolderTree },
    { name: 'Event Types', href: '/event-type', icon: Calendar },
  ]
};

export default function Sidenav() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const isLinkActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen flex-col justify-between border-r bg-white">
      <div className="px-6 py-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primaryColor">CodePass</span>
        </div>
      </div>

      <div className="flex-1 px-4 space-y-8 overflow-y-auto">
        <nav className="space-y-6">
          <div>
            <h2 className="mb-4 px-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              General
            </h2>
            <div className="space-y-1">
              {navigation.general.map((item) => {
                const isActive = isLinkActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      'hover:bg-primaryColor/10 hover:text-primaryColor',
                      'relative group',
                      isActive 
                        ? 'bg-primaryColor/10 text-primaryColor' 
                        : 'text-gray-600'
                    )}
                  >
                    <span className={cn(
                      'absolute inset-y-0 left-0 w-1 bg-primaryColor rounded-r-full transition-all transform',
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    )} />
                    <item.icon className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? 'text-primaryColor' : 'text-gray-400 group-hover:text-primaryColor'
                    )} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="mb-4 px-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Utilities
            </h2>
            <div className="space-y-1">
              {navigation.utilities.map((item) => {
                const isActive = isLinkActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      'hover:bg-primaryColor/10 hover:text-primaryColor',
                      'relative group',
                      isActive 
                        ? 'bg-primaryColor/10 text-primaryColor' 
                        : 'text-gray-600'
                    )}
                  >
                    <span className={cn(
                      'absolute inset-y-0 left-0 w-1 bg-primaryColor rounded-r-full transition-all transform',
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    )} />
                    <item.icon className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? 'text-primaryColor' : 'text-gray-400 group-hover:text-primaryColor'
                    )} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.fullname}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className={cn(
              "shrink-0 rounded-lg p-2 transition-colors",
              "hover:bg-red-50 hover:text-red-500",
              "group"
            )}
          >
            <LogOut className="h-5 w-5 transition-colors group-hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}