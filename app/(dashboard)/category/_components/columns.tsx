"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { UpdateCategoryDialog } from './updateCategoryDialog';
import { DeleteCategoryDialog } from './deleteCategoryDialog';
import { Category } from '@/lib/models/_category_models';
import { Edit, Trash2 } from "lucide-react";

export const createColumns = (fetchCategories: () => Promise<void>): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "subcategory",
    header: "Subcategory",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => (
      <div>{row.original.isFeatured ? "Yes" : "No"}</div>
    ),
  },
  {
    accessorKey: "totalEvents",
    header: "Total Events",
  },
  {
    accessorKey: "totalBlogs",
    header: "Total Blogs",
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-end pr-2">Actions</div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <UpdateCategoryDialog 
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primaryColor hover:bg-primaryColor/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
          }
          category={row.original}
          onSuccess={fetchCategories}
        />
        <DeleteCategoryDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          category={row.original}
          onSuccess={fetchCategories}
        />
      </div>
    ),
  },
]; 