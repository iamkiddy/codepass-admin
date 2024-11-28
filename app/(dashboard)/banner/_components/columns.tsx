"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { Banner } from '@/lib/models/_banner_models';
import Image from 'next/image';
import { UpdateBannerDialog } from './updateBannerDialog';
import { DeleteBannerDialog } from './deleteBannerDialog';

export const createColumns = (fetchBanners: () => Promise<void>): ColumnDef<Banner>[] => [
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[400px] truncate">{row.original.description}</div>
    ),
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-end pr-2">Actions</div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <UpdateBannerDialog 
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primaryColor hover:bg-primaryColor/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
          }
          banner={row.original}
          onSuccess={fetchBanners}
        />
        <DeleteBannerDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          banner={row.original}
          onSuccess={fetchBanners}
        />
      </div>
    ),
  },
]; 