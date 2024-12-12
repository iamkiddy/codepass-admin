"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteCategoryDialog } from './deleteCategoryDialog';
import { Category } from '@/lib/models/_category_models';
import { Trash2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type CategoryRow = Row<Category>;

export const createColumns = (fetchCategories: () => Promise<void>): ColumnDef<Category>[] => {
  const ImageCell = ({ row }: { row: CategoryRow }) => {
    const router = useRouter();
    const capitalizedIcon = row.original.icon.charAt(0).toUpperCase() + row.original.icon.slice(1);
    const IconComponent = LucideIcons[capitalizedIcon as keyof typeof LucideIcons] as LucideIcon;
    
    return (
      <div
        onClick={() => router.push(`/category/${row.original.id}`)}
        className="cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-fuchsia-500">
          {IconComponent && (
            <IconComponent
              className="w-6 h-6"
              color="white"
            />
          )}
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
      accessorKey: "icon",
      header: "Icon",
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