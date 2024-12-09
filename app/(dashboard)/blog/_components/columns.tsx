"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DeleteBlogDialog } from "./deleteBlogDialog";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/lib/models/_blog_model";
import { useRouter } from 'next/navigation';

type BlogRow = Row<Blog>;

const ImageCell = ({ row }: { row: BlogRow }) => {
  const router = useRouter();
  return (
    <div 
      onClick={() => router.push(`/blog/${row.original.id}`)}
      className="relative h-12 w-12 cursor-pointer hover:opacity-80"
    >
      <Image
        src={row.original.image}
        alt={row.original.title}
        fill
        className="object-cover rounded-md"
      />
    </div>
  );
};

const TitleCell = ({ row }: { row: BlogRow }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/blog/${row.original.id}`)}
      className="cursor-pointer hover:text-primaryColor"
    >
      {row.original.title}
    </div>
  );
};

const AuthorCell = ({ row }: { row: BlogRow }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/blog/${row.original.id}`)}
      className="cursor-pointer hover:text-primaryColor"
    >
      {row.original.author}
    </div>
  );
};

const StatusCell = ({ row }: { row: BlogRow }) => {
  const router = useRouter();
  const isActive = row.original.isActive === "true";
  return (
    <div
      onClick={() => router.push(`/blog/${row.original.id}`)}
      className="cursor-pointer"
    >
      <Badge 
        className={isActive ? 
          "bg-green-100 text-green-800 hover:bg-green-200" : 
          "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
      >
        {isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
};

export const createColumns = (fetchBlogs: () => Promise<void>): ColumnDef<Blog>[] => [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => <ImageCell row={row} />,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <TitleCell row={row} />,
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => <AuthorCell row={row} />,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-end pr-2">Actions</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
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
      );
    },
  },
]; 