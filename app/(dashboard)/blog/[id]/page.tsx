'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBlogById, updateBlog } from '@/lib/actions/blogs';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from '../../../../components/ui/richTextEditor';
import { toast } from 'sonner';
import { Blog } from '@/lib/models/_blog_model';

export default function BlogPost() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await getBlogById(params.id as string);
        const blogData = response.data[0]; // Assuming the API returns an array with one blog
        setBlog(blogData);
        
        // Initialize form state
        setTitle(blogData.title);
        setContent(blogData.content);
        setIsActive(blogData.isActive === "true");
        setPreviewUrl(blogData.image);
        
        // Initialize tags and categories if they exist in the API response
        if (blogData.tags) setTags(blogData.tags);
        if (blogData.categories) setCategories(blogData.categories);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch blog";
        toast.error(errorMessage, {
          duration: 3000,
          position: 'top-center',
          style: {
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
          },
        });
        router.push('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, router]);

  // Your existing handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleAddCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && categoryInput.trim()) {
      e.preventDefault();
      if (!categories.includes(categoryInput.trim())) {
        setCategories([...categories, categoryInput.trim()]);
      }
      setCategoryInput('');
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
      toast.error('Title is required');
      return;
    }

    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }

    try {
      setIsLoading(true);
      await updateBlog(params.id as string, {
        title: title.trim(),
        author: blog?.author || '',
        image: image || previewUrl,
        isActive: isActive.toString()
      });

      toast.success('Blog updated successfully');
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update blog');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !blog) {
    return <div>Loading...</div>;
  }

  // Rest of your existing JSX return statement
  return (
    <main className="max-w-5xl mx-auto px-2 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        <div className="flex gap-2">
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primaryColor hover:bg-primaryColor/90 text-white"
            >
              Edit Blog
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        // Edit Form
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            {/* Image Upload */}
            <div className="grid gap-2">
              <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                Blog Image
              </Label>
              <div className="flex items-center gap-4">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-md"
                  />
                )}
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Title Input */}
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* Content Editor */}
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

            {/* Tags Input */}
            <div className="grid gap-2">
              <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
                Tags
              </Label>
              <div className="space-y-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Press Enter to add tag"
                  disabled={isLoading}
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-white text-primaryColor border border-primaryColor hover:bg-primaryColor/10"
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

            {/* Categories Input */}
            <div className="grid gap-2">
              <Label htmlFor="categories" className="text-sm font-medium text-gray-700">
                Categories
              </Label>
              <div className="space-y-2">
                <Input
                  id="categories"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={handleAddCategory}
                  placeholder="Press Enter to add category"
                  disabled={isLoading}
                />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      className="bg-white text-primaryColor border border-primaryColor hover:bg-primaryColor/10"
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

            {/* Active Switch */}
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

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
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
          </div>
        </form>
      ) : (
        // Blog View Content
        <article className="space-y-8">
          {/* Blog Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {blog.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Blog Image */}
          {blog.image && (
            <div className="relative h-[400px] w-full">
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          )}

          {/* Blog Content */}
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags and Categories */}
          <div className="flex flex-wrap gap-4">
            {tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-600" />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      )}
    </main>
  );
}