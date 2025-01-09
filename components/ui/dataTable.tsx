"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, FolderSearch } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  total: number
  currentPage: number
  onPageChange: (page: number) => void
  pageSize?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  total,
  currentPage,
  onPageChange,
  pageSize = 10
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const totalPages = Math.ceil(total / pageSize);
  
  // Generate page numbers array
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    
    return pages;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="border rounded-[10px] border-gray-300">
          <div className="overflow-x-auto">
            <div className="max-h-[600px] overflow-y-auto min-w-full">
              <Table>
                <TableHeader>
                  {columns.map((column, index) => (
                    <TableHead key={index}>
                      <Skeleton className="h-4 w-24" />
                    </TableHead>
                  ))}
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((_, colIndex) => (
                        <TableCell key={colIndex}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex items-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-[10px] border-gray-300">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="max-h-[600px] overflow-y-auto min-w-full">
            <Table>
              <TableHeader className="bg-gray-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="sticky top-0">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead 
                          key={header.id} 
                          className="bg-gray-200 text-gray-600 font-semibold py-3 px-4"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3 px-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-b border-gray-100">
                    <TableCell 
                      colSpan={columns.length} 
                      className="h-[200px] text-center py-3 px-4"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <FolderSearch className="w-12 h-12 text-primaryColor opacity-40" />
                        <p className="text-lg font-medium text-gray-500">
                          No results found
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <p className="text-sm text-gray-500 text-center sm:text-left order-2 sm:order-1">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            total
          )}{" "}
          of {total} entries
        </p>
        <div className="flex items-center space-x-2 order-1 sm:order-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full hover:bg-gray-100 hidden sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-1 overflow-x-auto">
            {getPageNumbers().map((pageNum) => (
              <Button
                key={pageNum}
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={`rounded-full hover:bg-gray-100 min-w-[32px] ${
                  pageNum === currentPage 
                    ? "bg-primaryColor text-white hover:bg-primaryColor/90"
                    : ""
                }`}
              >
                {pageNum}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-full hover:bg-gray-100 hidden sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}