'use client';

import { useState, useEffect } from 'react';
import { getAllBanners } from '@/lib/actions/banner';
import type { Banner } from '@/lib/models/_banner_models';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { createColumns } from './_components/columns';
import { FilterBanner } from './_components/filterBanner';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BannerPage() {
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const columns = createColumns(
    () => fetchBanners(searchQuery),
    (id: string) => router.push(`/banner/${id}`)
  );

  const fetchBanners = async (search?: string, page: number = 1) => {
    try {
      setIsTableLoading(true);
      const response = await getAllBanners({ 
        search, 
        page,
        limit: pageSize 
      });
      setBanners(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch banners:', error);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchBanners(searchQuery, currentPage);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentPage]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#262424]">Banners</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and oversee all banners in one place
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">All Banners</span>
            <span className="text-xl font-semibold text-[#262424]">
              {total}
            </span> 
          </div>
          
          <div className="flex items-center gap-4">
            <FilterBanner 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <Button 
              onClick={() => router.push('/banner/create')}
              className="bg-primaryColor hover:bg-primaryColor/90 text-white gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Banner
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <DataTable
            columns={columns}
            data={banners}
            isLoading={isTableLoading}
            total={total}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageSize={pageSize}
          />
        </Card>
      </div>
    </div>
  );
}
