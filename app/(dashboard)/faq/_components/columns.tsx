"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { Faq } from '@/lib/models/_faq_models';
import { UpdateFaqDialog } from './updateFaqDialog';
import { DeleteFaqDialog } from './deleteFaqDialog';

export const createColumns = (fetchFaqs: () => Promise<void>): ColumnDef<Faq>[] => [
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => (
      <div 
        className="max-w-[400px] truncate"
        dangerouslySetInnerHTML={{ __html: row.original.question }}
      />
    ),
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ row }) => (
      <div 
        className="max-w-[400px] truncate"
        dangerouslySetInnerHTML={{ __html: row.original.answer }}
      />
    ),
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-end pr-2">Actions</div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <UpdateFaqDialog 
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primaryColor hover:bg-primaryColor/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
          }
          faq={row.original}
          onSuccess={fetchFaqs}
        />
        <DeleteFaqDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          faq={row.original}
          onSuccess={fetchFaqs}
        />
      </div>
    ),
  },
];
