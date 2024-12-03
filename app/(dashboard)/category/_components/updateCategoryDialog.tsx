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
import { Switch } from "@/components/ui/switch";
import { updateCategory } from '@/lib/actions/categories';
import { ImageUpload } from "@/components/ui/image-upload";
import { Category } from '@/lib/models/_category_models';

interface UpdateCategoryDialogProps {
  trigger: React.ReactNode;
  category: Category;
  onSuccess?: () => void;
}

export const UpdateCategoryDialog: React.FC<UpdateCategoryDialogProps> = ({
  trigger,
  category,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(category.name);
  const [image, setImage] = useState<File | null>(null);
  const [subcategory, setSubcategory] = useState(category.subcategory || '');
  const [isFeatured, setIsFeatured] = useState(category.isFeatured);
  const [previewUrl, setPreviewUrl] = useState<string | null>(category.image);

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
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
      
      const formData = new FormData();
      formData.append('name', name.trim());
      
      if (image) {
        formData.append('image', image);
      }

    
      formData.append('isFeatured', String(isFeatured));

      await updateCategory({
        id: category.id,
        formData
      });

      toast.success('Category updated successfully', {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
        },
      });
      
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
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
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px] p-6 bg-white rounded-xl border shadow-lg">
        <AlertDialogCancel className="absolute border-none right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 hover:text-secondaryColor">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>

        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-xl font-semibold text-[#262424]">
            Edit Category
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-sm">
            Update the category information below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          <ImageUpload
            value={image}
            previewUrl={previewUrl}
            onChange={setImage}
            onPreviewChange={setPreviewUrl}
            disabled={isLoading}
          />

          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subcategory" className="text-sm font-medium text-gray-700">
              Subcategory
            </Label>
            <Input
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
              Featured Category
            </Label>
            <Switch
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
              disabled={isLoading}
            />
          </div>
        </div>

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