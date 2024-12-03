'use client';

import { useState, useEffect } from 'react';
import { getAllFaqs } from '@/lib/actions/faq';
import type { Faq } from '@/lib/models/_faq_models';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { createColumns } from './_components/columns';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { FilterFaq } from './_components/filterFaq';

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchFaqs = async (search?: string) => {
    try {
      setIsTableLoading(true);
      const response = await getAllFaqs({ search });
      setFaqs(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchFaqs(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const columns = createColumns(fetchFaqs);

  return (
    <main className="px-2 mt-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#262424]">FAQs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and oversee all frequently asked questions in one place
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">All FAQs</span>
            <span className="text-xl font-semibold text-[#262424]">
              {total}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <FilterFaq 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <Link href="/faq/add">
              <Button className="bg-primaryColor hover:bg-primaryColor/90 text-white gap-2">
                <Plus className="h-4 w-4" />
                Add FAQ
              </Button>
            </Link>
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <DataTable
            columns={columns}
            data={faqs}
            isLoading={isTableLoading}
            total={total}
          />
        </Card>
      </div>
    </main>
  );
}
