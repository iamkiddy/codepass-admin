'use client';

import { useState, useEffect } from 'react';
import { getAllUsers } from '@/lib/actions/user';
import type { User } from '@/lib/models/_user_models';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { createColumns } from './_components/columns';
import { AddUserDialog } from './_components/addUser';
import { FilterUsers } from './_components/filterUsers';

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchUsers = async (search?: string) => {
    try {
      setIsTableLoading(true);
      const response = await getAllUsers({ search });
      setUsers(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const columns = createColumns(fetchUsers);

  return (
    <main className="px-2 mt-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#262424]">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and oversee all users in one place
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">All Users</span>
            <span className="text-xl font-semibold text-[#262424]">
              {total}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <FilterUsers 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <AddUserDialog onSuccess={() => fetchUsers(searchQuery)} />
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <DataTable
            columns={columns}
            data={users}
            isLoading={isTableLoading}
            total={total}
          />
        </Card>
      </div>
    </main>
  );
}
