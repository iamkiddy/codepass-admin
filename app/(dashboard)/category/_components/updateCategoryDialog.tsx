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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCategory } from '@/lib/actions/categories';
import { Category } from '@/lib/models/_category_models';

interface UpdateCategoryDialogProps {
  trigger: React.ReactNode;  // Custom trigger element (Edit button)
  category: Category;        // Category data to edit
  onSuccess?: () => void;   // Callback after successful update
}

export const UpdateCategoryDialog: React.FC<UpdateCategoryDialogProps> = ({
  trigger,
  category,
  onSuccess
}) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Validate input
    if (!name.trim()) {
      toast.error('Category name is required', {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
        },
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Call API to update category
      await updateCategory({
        id: category.id,
        name: name.trim()
      });

      // Show success message
      toast.success('Category updated successfully', {
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
      toast.error(error instanceof Error ? error.message : 'Failed to update category', {
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
      {/* Trigger button (Edit icon) */}
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
            Edit Category
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-sm">
            Edit the category by entering a new name below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Form content */}
        <div className="py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
            />
          </div>
        </div>

        {/* Dialog footer with actions */}
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel 
            className="border border-gray-300 hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleUpdate}
            className="bg-primaryColor hover:bg-primaryColor/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save changes'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}; 