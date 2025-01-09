'use client';

import { useState, useEffect } from 'react';
import { getAllEventTypes } from '@/lib/actions/eventTypes';
import type { EventType } from '@/lib/models/_event_type_models';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { AddEventTypeDialog } from './_components/addEventTypeDialog';
import { createColumns } from './_components/columns';
import { FilterEventType } from './_components/filterEventType';

export default function EventType() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchEventTypes = async (search?: string, page: number = 1) => {
    try {
      setIsTableLoading(true);
      const response = await getAllEventTypes({ 
        search, 
        page,
        limit: pageSize 
      });
      setEventTypes(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch event types:', error);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchEventTypes(searchQuery, currentPage);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentPage]);

  const columns = createColumns(fetchEventTypes);

  return (
    <main className="px-2 mt-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#262424]">Event Types</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and oversee all event types in one place
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">All Event Types</span>
            <span className="text-xl font-semibold text-[#262424]">
              {total}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <FilterEventType 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <AddEventTypeDialog onSuccess={fetchEventTypes} />
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <DataTable
            columns={columns}
            data={eventTypes}
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
