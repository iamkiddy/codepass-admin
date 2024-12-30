"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { Banner } from '@/lib/models/_banner_models';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { DeleteBannerDialog } from './deleteBannerDialog';
import { useRouter } from 'next/navigation';

export const createColumns = (fetchBanners: () => Promise<void>): ColumnDef<Banner>[] => {
  const router = useRouter();
  
  return [
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
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }) => (
        <Badge 
          variant={row.original.isFeatured ? "default" : "secondary"}
          className="min-w-[80px] justify-center"
        >
          {row.original.isFeatured ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge 
          variant={row.original.isActive ? "success" : "destructive"}
          className="min-w-[80px] justify-center"
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-end pr-2">Actions</div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-primaryColor hover:bg-primaryColor/10"
            onClick={() => router.push(`/banner/${row.original.id}`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
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
}; 