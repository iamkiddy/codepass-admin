'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Calendar, Users, Ticket, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data (replace with real data from your API)
const stats = [
  {
    name: 'Total Events',
    value: '45',
    change: '+12.3%',
    trend: 'up',
    icon: Calendar,
    color: 'primaryColor'
  },
  {
    name: 'Active Users',
    value: '2,340',
    change: '+18.2%',
    trend: 'up',
    icon: Users,
    color: 'secondaryColor'
  },
  {
    name: 'Ticket Sales',
    value: '12,789',
    change: '-3.4%',
    trend: 'down',
    icon: Ticket,
    color: 'primaryColor'
  },
  {
    name: 'Revenue',
    value: '$48,295',
    change: '+10.3%',
    trend: 'up',
    icon: BarChart3,
    color: 'secondaryColor'
  },
];

const recentEvents = [
  { id: 1, name: 'Tech Conference 2024', date: '2024-04-15', status: 'upcoming', attendees: 230 },
  { id: 2, name: 'Digital Summit', date: '2024-04-20', status: 'upcoming', attendees: 180 },
  { id: 3, name: 'Web Development Workshop', date: '2024-04-10', status: 'completed', attendees: 45 },
  { id: 4, name: 'AI & ML Symposium', date: '2024-04-25', status: 'upcoming', attendees: 320 },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const StatsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-7 w-24 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        </Card>
      ))}
    </div>
  );

  const TableSkeleton = () => (
    <Card className="mt-6">
      <div className="p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8" />
            ))}
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-12" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <StatsSkeleton />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to your event management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <stat.icon className={`h-8 w-8 text-${stat.color} opacity-80`} />
              <span className={`text-sm font-medium flex items-center gap-1 ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.name}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Events Table */}
      <Card className="mt-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Event Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Attendees</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{event.name}</td>
                    <td className="py-3 px-4">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'upcoming' 
                          ? 'bg-primaryColor/10 text-primaryColor' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{event.attendees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
