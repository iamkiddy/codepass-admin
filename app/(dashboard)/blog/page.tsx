'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { FilterBlog } from './_components/filterBlog';
import { Blog } from '@/lib/models/_blog_model';
import { getAllBlogs } from '@/lib/actions/blogs';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { createColumns } from './_components/columns';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchBlogs = async (search?: string) => {
    try {
      setIsTableLoading(true);
      const response = await getAllBlogs({ search });
      setBlogs(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setIsTableLoading(false);
    }
  };

  

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchBlogs(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const columns = createColumns(fetchBlogs);

  return (
    <main className="px-2 mt-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#262424]">Blogs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and oversee all blogs in one place
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">All Blogs</span>
            <span className="text-xl font-semibold text-[#262424]">
              {total}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <FilterBlog 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <Link href="/blog/create">
              <Button className="bg-primaryColor hover:bg-primaryColor/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Blog
              </Button>
            </Link>
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <DataTable
            columns={columns}
            data={blogs}
            isLoading={isTableLoading}
            total={total}
          />
        </Card>
      </div>
    </main>
  );
}
