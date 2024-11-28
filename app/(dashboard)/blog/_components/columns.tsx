"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { UpdateBlogDialog } from "./updateBlogDialog";
import { DeleteBlogDialog } from "./deleteBlogDialog";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/lib/models/_blog_model";

export const createColumns = (fetchBlogs: () => Promise<void>): ColumnDef<Blog>[] => [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative h-12 w-12">
        <Image
          src={row.original.image}
          alt={row.original.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive === "true";
      return (
        <Badge 
          className={isActive ? 
            "bg-green-100 text-green-800" : 
            "bg-gray-100 text-gray-800"
          }
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-end pr-2">Actions</div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <UpdateBlogDialog 
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primaryColor hover:bg-primaryColor/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
          }
          blog={row.original}
          onSuccess={fetchBlogs}
        />
        <DeleteBlogDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          blog={row.original}
          onSuccess={fetchBlogs}
        />
      </div>
    ),
  },
]; 