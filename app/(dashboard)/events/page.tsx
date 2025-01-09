'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { createColumns } from './_components/columns';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { FilterEvents } from './_components/filterEvents';
// Mock data interface
interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  eventType: string;
  capacity: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  ticketsSold: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Mock fetch function (remove unused parameter)
  const fetchEvents = async () => {
    try {
      setIsTableLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockEvents: Event[] = [
        {
          id: '1',
          name: 'Tech Conference 2024',
          date: '2024-04-15',
          location: 'Convention Center',
          category: 'Technology',
          eventType: 'Conference',
          capacity: 500,
          status: 'upcoming',
          ticketsSold: 350
        },
        {
          id: '2',
          name: 'Music Festival',
          date: '2024-05-20',
          location: 'Central Park',
          category: 'Entertainment',
          eventType: 'Festival',
          capacity: 2000,
          status: 'upcoming',
          ticketsSold: 1500
        },
        {
          id: '3',
          name: 'Business Workshop',
          date: '2024-03-30',
          location: 'Business Center',
          category: 'Business',
          eventType: 'Workshop',
          capacity: 100,
          status: 'completed',
          ticketsSold: 98
        }
      ];

      setEvents(mockEvents);
      setTotal(mockEvents.length);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchEvents();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const columns = createColumns();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="px-2 mt-10">
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-2xl font-semibold text-[#262424]">Events</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and oversee all events in one place
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">All Events</span>
            <span className="text-xl font-semibold text-[#262424]">
              {total}
            </span>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <FilterEvents 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <Link href="/events/create">
              <Button className="bg-primaryColor hover:bg-primaryColor/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>
        </div>

        <Card className="border-none shadow-sm overflow-hidden">
          <DataTable
            columns={columns}
            data={events}
            isLoading={isTableLoading}
            total={total}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageSize={pageSize}
          />
        </Card>
      </div>
    </main>
  );
}
