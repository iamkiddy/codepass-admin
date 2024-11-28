'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { User } from "@/lib/models/_user_models";
import { UpdateUserDialog } from './updateUser';
import { DeleteUserDialog } from './deleteUser';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const createColumns = (fetchUsers: () => Promise<void>): ColumnDef<User>[] => [
  {
    accessorKey: "fullname",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("role")}
      </Badge>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge 
        variant={row.getValue("isActive") ? "success" : "destructive"}
        className="min-w-[80px] justify-center"
      >
        {row.getValue("isActive") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => {
      const date = row.getValue("lastLogin");
      if (!date || date === "None") return "Never";
      return format(new Date(date as string), "PPp");
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-end pr-2">Actions</div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <UpdateUserDialog 
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primaryColor hover:bg-primaryColor/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
          }
          user={row.original}
          onSuccess={fetchUsers}
        />
        <DeleteUserDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          user={row.original}
          onSuccess={fetchUsers}
        />
      </div>
    ),
  },
];
