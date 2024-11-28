"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { UpdateEventTypeDialog } from './updateEventTypeDialog';
import { DeleteEventTypeDialog } from './deleteEventTypeDialog';
import { EventType } from '@/lib/models/_event_type_models';

export const createColumns = (fetchEventTypes: () => Promise<void>): ColumnDef<EventType>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-end pr-2">Actions</div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <UpdateEventTypeDialog 
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primaryColor hover:bg-primaryColor/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
          }
          eventType={row.original}
          onSuccess={fetchEventTypes}
        />
        <DeleteEventTypeDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          eventType={row.original}
          onSuccess={fetchEventTypes}
        />
      </div>
    ),
  },
];

export const columns = [
  // your column definitions
];
