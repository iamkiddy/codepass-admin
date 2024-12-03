"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteCategoryDialog } from './deleteCategoryDialog';
import { Category } from '@/lib/models/_category_models';
import { Trash2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type CategoryRow = Row<Category>;

export const createColumns = (fetchCategories: () => Promise<void>): ColumnDef<Category>[] => {
  const ImageCell = ({ row }: { row: CategoryRow }) => {
    const router = useRouter();
    return (
      <div
        onClick={() => router.push(`/category/${row.original.id}`)}
        className="cursor-pointer"
      >
        <div className="relative h-12 w-12">
          <Image
            src={row.original.image}
            alt={row.original.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
    );
  };

  const NameCell = ({ row }: { row: CategoryRow }) => {
    const router = useRouter();
    return (
      <div
        onClick={() => router.push(`/category/${row.original.id}`)}
        className="cursor-pointer hover:text-primaryColor"
      >
        {row.original.name}
      </div>
    );
  };

  const FeaturedCell = ({ row }: { row: CategoryRow }) => {
    const router = useRouter();
    return (
      <div
        onClick={() => router.push(`/category/${row.original.id}`)}
        className="cursor-pointer hover:text-primaryColor"
      >
        {row.original.isFeatured ? "Yes" : "No"}
      </div>
    );
  };

  const TotalEventsCell = ({ row }: { row: CategoryRow }) => {
    const router = useRouter();
    return (
      <div
        onClick={() => router.push(`/category/${row.original.id}`)}
        className="cursor-pointer hover:text-primaryColor"
      >
        {row.original.totalEvents}
      </div>
    );
  };

  const TotalBlogsCell = ({ row }: { row: CategoryRow }) => {
    const router = useRouter();
    return (
      <div
        onClick={() => router.push(`/category/${row.original.id}`)}
        className="cursor-pointer hover:text-primaryColor"
      >
        {row.original.totalBlogs}
      </div>
    );
  };

  return [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => <ImageCell row={row} />,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <NameCell row={row} />,
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }) => <FeaturedCell row={row} />,
    },
    {
      accessorKey: "totalEvents",
      header: "Total Events",
      cell: ({ row }) => <TotalEventsCell row={row} />,
    },
    {
      accessorKey: "totalBlogs",
      header: "Total Blogs",
      cell: ({ row }) => <TotalBlogsCell row={row} />,
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-end pr-2">Actions</div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
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
}; 