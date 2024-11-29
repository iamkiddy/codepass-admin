'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

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

export const createColumns = (): ColumnDef<Event>[] => [
  {
    accessorKey: "name",
    header: "Event Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "eventType",
    header: "Event Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusStyles = {
        upcoming: "bg-blue-100 text-blue-800",
        ongoing: "bg-green-100 text-green-800",
        completed: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-100 text-red-800",
      };

      return (
        <Badge className={statusStyles[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "ticketsSold",
    header: "Tickets Sold",
    cell: ({ row }) => (
      <span>
        {row.original.ticketsSold} / {row.original.capacity}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Link href={`/events/${row.original.id}`}>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-blue-500 hover:bg-blue-50"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/events/${row.original.id}/edit`}>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-primaryColor hover:bg-primaryColor/10"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-red-500 hover:bg-red-50"
          onClick={() => {
            // Add delete functionality
            console.log('Delete event:', row.original.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]; 