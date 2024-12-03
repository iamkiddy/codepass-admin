'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCategory, updateCategory } from '@/lib/actions/categories';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from '@/components/ui/image-upload';
import { Badge } from "@/components/ui/badge";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>('');
  const [subcategoryInput, setSubcategoryInput] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const data = await getCategory(params.id as string);
        setName(data.name);
        setSubcategories(data.subcategory || []);
        setIsFeatured(data.isFeatured);
        setPreviewUrl(data.image);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch category";
        toast.error(errorMessage, {
          duration: 3000,
          position: 'top-center',
          style: {
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
          },
        });
        router.push('/category');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCategory();
    }
  }, [params.id, router]);

  const handleAddSubcategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && subcategoryInput.trim()) {
      e.preventDefault();
      if (!subcategories.includes(subcategoryInput.trim())) {
        setSubcategories([...subcategories, subcategoryInput.trim()]);
      }
      setSubcategoryInput('');
    }
  };

  const removeSubcategory = (subcategoryToRemove: string) => {
    setSubcategories(subcategories.filter(sub => sub !== subcategoryToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      if (subcategories.length > 0) {
        formData.append('subcategory', subcategories.join(','));
      }
      formData.append('isFeatured', isFeatured.toString());
      if (image) formData.append('image', image);

      await updateCategory({ 
        id: params.id as string, 
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
      router.push('/category');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update category";
      toast.error(errorMessage, {
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

  const handlePreviewChange = (url: string | null) => {
    setPreviewUrl(url || '');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Edit Category</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-gray-300"
        >
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4">
          <ImageUpload
            value={image}
            previewUrl={previewUrl || ''}
            onChange={setImage}
            onPreviewChange={handlePreviewChange}
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
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subcategories" className="text-sm font-medium text-gray-700">
              Subcategories
            </Label>
            <div className="space-y-2">
              <Input
                id="subcategories"
                value={subcategoryInput}
                onChange={(e) => setSubcategoryInput(e.target.value)}
                onKeyDown={handleAddSubcategory}
                placeholder="Press Enter to add subcategory"
                className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
                disabled={isLoading}
              />
              <ul className="flex flex-wrap gap-2">
                {subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <Badge
                      className="bg-white text-primaryColor border border-primaryColor hover:bg-primaryColor/10"
                    >
                      {subcategory}
                      <button
                        type="button"
                        onClick={() => removeSubcategory(subcategory)}
                        className="ml-2 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
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

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="border-gray-300"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primaryColor hover:bg-primaryColor/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
