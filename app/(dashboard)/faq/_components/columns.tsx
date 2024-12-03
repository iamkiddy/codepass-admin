"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { Faq } from '@/lib/models/_faq_models';
import { DeleteFaqDialog } from './deleteFaqDialog';
import { useRouter } from 'next/navigation';

type FaqRow = Row<Faq>;

const QuestionCell = ({ row }: { row: FaqRow }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/faq/${row.original.id}`)}
      className="cursor-pointer hover:text-primaryColor max-w-[400px] truncate"
      dangerouslySetInnerHTML={{ __html: row.original.question }}
    />
  );
};

const AnswerCell = ({ row }: { row: FaqRow }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/faq/${row.original.id}`)}
      className="cursor-pointer hover:text-primaryColor max-w-[400px] truncate"
      dangerouslySetInnerHTML={{ __html: row.original.answer }}
    />
  );
};

export const createColumns = (fetchFaqs: () => Promise<void>): ColumnDef<Faq>[] => {
  return [
    {
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => <QuestionCell row={row} />,
    },
    {
      accessorKey: "answer",
      header: "Answer",
      cell: ({ row }) => <AnswerCell row={row} />,
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-end pr-2">Actions</div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
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
};
