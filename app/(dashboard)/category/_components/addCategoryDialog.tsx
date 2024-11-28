'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createCategory } from '@/lib/actions/categories';

interface AddCategoryDialogProps {
  onSuccess?: () => void;
}

export function AddCategoryDialog({ onSuccess }: AddCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [subcategory, setSubcategory] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const resetForm = () => {
    setName('');
    setImage(null);
    setSubcategory('');
    setIsFeatured(false);
  };

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

    if (!image) {
      toast.error('Category image is required', {
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
      
      await createCategory({
        name: name.trim(),
        image: image,
        subcategory: subcategory.trim() || undefined,
        isFeatured
      });

      toast.success('Category created successfully', {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
        },
      });
      
      setIsOpen(false);
      resetForm();
      onSuccess?.();
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create category', {
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
        <Button className="bg-primaryColor hover:bg-primaryColor/90 text-white">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="sm:max-w-[425px] p-6 bg-white rounded-xl border shadow-lg">
        <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>

        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-xl font-semibold text-[#262424]">
            Add Category
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-sm">
            Create a new category by filling out the information below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-6 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image" className="text-sm font-medium text-gray-700">
              Image *
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                }
              }}
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
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
            />
          </div>
        </div>

        <AlertDialogFooter className="mt-6 gap-2">
          <AlertDialogCancel 
            className="border border-gray-300 hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleCreate}
            className="bg-primaryColor hover:bg-primaryColor/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}