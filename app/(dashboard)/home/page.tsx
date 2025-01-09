'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Calendar, Users, Ticket, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const stats = [
  {
    name: 'Total Events',
    value: '45',
    change: '+12.3%',
    trend: 'up',
    icon: Calendar,
    color: 'primaryColor',
    description: 'Events this month'
  },
  {
    name: 'Active Users',
    value: '2,340',
    change: '+18.2%',
    trend: 'up',
    icon: Users,
    color: 'secondaryColor',
    description: 'Current users'
  },
  {
    name: 'Ticket Sales',
    value: '12,789',
    change: '-3.4%',
    trend: 'down',
    icon: Ticket,
    color: 'primaryColor',
    description: 'Tickets sold'
  },
  {
    name: 'Revenue',
    value: '$48,295',
    change: '+10.3%',
    trend: 'up',
    icon: BarChart3,
    color: 'secondaryColor',
    description: 'Monthly revenue'
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const StatsSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-8 md:h-10 md:w-10 rounded-lg" />
            <Skeleton className="h-4 w-16 md:w-20" />
          </div>
          <div className="mt-4 md:mt-6">
            <Skeleton className="h-7 w-24 md:h-8 md:w-28 mb-2" />
            <Skeleton className="h-4 w-20 md:w-24" />
          </div>
        </Card>
      ))}
    </div>
  );

  const TableSkeleton = () => (
    <Card className="mt-6 overflow-hidden">
      <div className="p-4 md:p-6">
        <Skeleton className="h-6 md:h-8 w-32 md:w-40 mb-6" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12 md:h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10 max-w-7xl">
        <div className="space-y-6 md:space-y-8">
          <div>
            <Skeleton className="h-8 md:h-10 w-48 md:w-56 mb-3" />
            <Skeleton className="h-5 md:h-6 w-64 md:w-72" />
          </div>
          <StatsSkeleton />
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10 max-w-7xl">
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Welcome back! Here&apos;s what&apos;s happening with your events today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <Card 
              key={stat.name} 
              className="p-4 md:p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 md:p-3 rounded-xl bg-${stat.color}/10`}>
                  <stat.icon className={`h-6 w-6 md:h-7 md:w-7 text-${stat.color}`} />
                </div>
                <span className={`text-xs md:text-sm font-medium flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? 
                    <ArrowUp className="h-3 w-3 md:h-4 md:w-4" /> : 
                    <ArrowDown className="h-3 w-3 md:h-4 md:w-4" />
                  }
                  {stat.change}
                </span>
              </div>
              <div className="mt-4 md:mt-6 space-y-1">
                <h3 className="text-2xl md:text-3xl font-bold">{stat.value}</h3>
                <div className="space-y-1">
                  <p className="text-sm md:text-base font-medium">{stat.name}</p>
                  <p className="text-xs md:text-sm text-gray-500">{stat.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Events Table */}
        <Card className="overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-semibold">Recent Events</h2>
              <button className="text-sm text-primaryColor hover:text-primaryColor/80 font-medium">
                View all
              </button>
            </div>
            <div className="overflow-x-auto -mx-4 md:-mx-6">
              <div className="inline-block min-w-full align-middle px-4 md:px-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="py-3 text-left text-xs md:text-sm font-semibold text-gray-500">
                        Event Name
                      </th>
                      <th className="py-3 text-left text-xs md:text-sm font-semibold text-gray-500">
                        Date
                      </th>
                      <th className="py-3 text-left text-xs md:text-sm font-semibold text-gray-500">
                        Status
                      </th>
                      <th className="py-3 text-left text-xs md:text-sm font-semibold text-gray-500">
                        Attendees
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentEvents.map((event) => (
                      <tr 
                        key={event.id} 
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="py-4 text-sm md:text-base font-medium text-gray-900">
                          {event.name}
                        </td>
                        <td className="py-4 text-sm md:text-base text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium ${
                            event.status === 'upcoming' 
                              ? 'bg-primaryColor/10 text-primaryColor' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm md:text-base text-gray-500">
                          {event.attendees.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
