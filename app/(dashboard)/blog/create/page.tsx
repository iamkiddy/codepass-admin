'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from '../../../../components/ui/richTextEditor';
import { createBlog } from '@/lib/actions/blogs';
import { getAllCategories } from '@/lib/actions/categories';
import { Category } from '@/lib/models/_category_models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import { Badge } from "@/components/ui/badge";

export default function CreateBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setAvailableCategories(response.data);
      } catch {
        toast.error('Failed to fetch categories', {
          duration: 3000,
          position: 'top-center',
          style: {
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
          },
        });
      }
    };

    fetchCategories();
  }, []);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const removeCategory = (categoryToRemove: string) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Title is required', {
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

    if (!content.trim()) {
      toast.error('Content is required', {
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
      toast.error('Image is required', {
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

    if (tags.length === 0) {
      toast.error('At least one tag is required', {
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

    if (categories.length === 0) {
      toast.error('At least one category is required', {
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
      
      await createBlog({
        title: title.trim(),
        content: content.trim(),
        image,
        tags,
        categories,
        isActive: isActive.toString()
      });

      toast.success('Blog created successfully', {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
        },
      });
      router.back();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create blog', {
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Create New Blog</h1>
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
          <div className="grid gap-2">
            <ImageUpload
              value={image}
              previewUrl={previewUrl}
              onChange={setImage}
              onPreviewChange={setPreviewUrl}
              disabled={isLoading}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content" className="text-sm font-medium text-gray-700">
              Content *
            </Label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
              Tags *
            </Label>
            <div className="space-y-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Press Enter to add tag"
                className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
                disabled={isLoading}
              />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-primaryColor/10 text-primaryColor hover:bg-primaryColor/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="categories" className="text-sm font-medium text-gray-700">
              Categories *
            </Label>
            <div className="space-y-2">
              <Select
                onValueChange={(value) => {
                  const selectedCategory = availableCategories.find(cat => cat.id === value);
                  if (selectedCategory && !categories.includes(selectedCategory.name)) {
                    setCategories([...categories, selectedCategory.name]);
                  }
                }}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {availableCategories.map((category) => (
                    <SelectItem 
                      key={category.id} 
                      value={category.id}
                      disabled={categories.includes(category.name)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="border-gray-300"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-2 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active Blog
            </Label>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
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
            {isLoading ? 'Creating...' : 'Create Blog'}
          </Button>
        </div>
      </form>
    </div>
  );
} 