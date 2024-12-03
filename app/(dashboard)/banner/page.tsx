'use client';

import { useState, useEffect } from 'react';
import { getAllBanners } from '@/lib/actions/banner';
import type { Banner } from '@/lib/models/_banner_models';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { createColumns } from './_components/columns';
import { FilterBanner } from './_components/filterBanner';
import { AddBannerDialog } from './_components/addBannerDialog';

export default function BannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const columns = createColumns(() => fetchBanners(searchQuery));

  const fetchBanners = async (search?: string) => {
    try {
      setIsTableLoading(true);
      const response = await getAllBanners({ search });
      setBanners(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch banners:', error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchBanners(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

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
            <AddBannerDialog onSuccess={() => fetchBanners(searchQuery)} />
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <DataTable
            columns={columns}
            data={banners}
            isLoading={isTableLoading}
            total={total}
          />
        </Card>
      </div>
    </div>
  );
}
