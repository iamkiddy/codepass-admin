'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllCategories } from '@/lib/actions/categories';
import type { Category } from '@/lib/models/_category_models';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { FilterCategory } from './_components/filterCategory';
import { createColumns } from './_components/columns';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

export default function CategoryPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchCategories = async (search?: string, page: number = 1) => {
    try {
      setIsTableLoading(true);
      const response = await getAllCategories({ 
        search, 
        page,
        limit: pageSize 
      });
      setCategories(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCategories(searchQuery, currentPage);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = createColumns(fetchCategories);

  return (
    <main className="px-2 mt-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#262424]">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and oversee all categories in one place
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">All Categories</span>
            <span className="text-xl font-semibold text-[#262424]">
              {total}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <FilterCategory 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <Button 
              className="bg-primaryColor hover:bg-primaryColor/90 text-white"
              onClick={() => router.push('/category/create')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <DataTable
            columns={columns}
            data={categories}
            isLoading={isTableLoading}
            total={total}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageSize={pageSize}
          />
        </Card>
      </div>
    </main>
  );
}
