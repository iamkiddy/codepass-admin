'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCategory } from '@/lib/actions/categories';
import { Category } from '@/lib/models/_category_models';

interface DeleteCategoryDialogProps {
  trigger: React.ReactNode;  // Custom trigger element (Delete button)
  category: Category;        // Category to delete
  onSuccess?: () => void;   // Callback after successful deletion
}

export const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
  trigger,
  category,
  onSuccess
}) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle delete action
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      
      // Call API to delete category
      await deleteCategory({
        id: category.id
      });

      // Show success message
      toast.success('Category deleted successfully', {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
        },
      });
      
      // Close dialog and refresh data
      setIsOpen(false);
      onSuccess?.();
      
    } catch (error) {
      // Handle errors
      toast.error(error instanceof Error ? error.message : 'Failed to delete category', {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger button (Delete icon) */}
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      {/* Dialog content */}
      <AlertDialogContent className="sm:max-w-[425px] p-6 bg-white rounded-xl border shadow-lg">
        {/* Close button */}
        <AlertDialogCancel className="absolute border-none right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 hover:text-secondaryColor">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>

        {/* Dialog header */}
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-xl font-semibold text-[#262424]">
            Delete Category
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-sm">
            Are you sure you want to delete &quot;{category.name}&quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Dialog footer with actions */}
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel 
            className="border border-gray-300 hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}; 