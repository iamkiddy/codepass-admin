'use client';

import { useState } from 'react';
import { ArrowLeft, Calendar, User, Tag, Eye, ThumbsUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '../../../../components/ui/richTextEditor';

export default function BlogPost() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data (replace with actual API data)
  const blog = {
    title: "The Future of Event Management in 2024",
    content: `<div>
      <p>The event management industry is rapidly evolving with new technologies and trends shaping the way we plan and execute events...</p>
      <h2>Digital Transformation in Events</h2>
      <p>Virtual and hybrid events continue to grow in popularity, offering new opportunities for engagement and reach...</p>
      <h2>Sustainable Event Practices</h2>
      <p>Sustainability has become a core focus for event planners, with increasing emphasis on reducing environmental impact...</p>
    </div>`,
    author: "John Doe",
    date: "2024-03-20",
    tags: ["Technology", "Events", "Digital", "Future"],
    categories: ["Event Planning", "Industry Trends"],
    views: 1234,
    likes: 56,
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop",
    isActive: true
  };

  // Form state
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [tags, setTags] = useState<string[]>(blog.tags);
  const [categories, setCategories] = useState<string[]>(blog.categories);
  const [isActive, setIsActive] = useState(blog.isActive);
  const [tagInput, setTagInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState(blog.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  return (
    <main className="max-w-5xl mx-auto px-2 py-8">
      <div className="space-y-8">
        {/* Header with back button and action buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Button>

          {/* Conditional rendering of action buttons */}
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  className="border-gray-300"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primaryColor hover:bg-primaryColor/90 text-white"
                  type="submit"
                >
                  Publish Changes
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="border-gray-300"
                onClick={() => setIsEditing(true)}
              >
                Edit Blog
              </Button>
            )}
          </div>
        </div>

        {/* Conditional rendering of edit form or blog content */}
        {isEditing ? (
          // Edit Form Content
          <form className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                  Content *
                </Label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
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
                  onChange={handleImageChange}
                  className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
                />
                {previewUrl && (
                  <div className="relative mt-2 h-48 w-full">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                )}
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
                  <Input
                    id="categories"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    onKeyDown={handleAddCategory}
                    placeholder="Press Enter to add category"
                    className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
                  />
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
                />
              </div>
            </div>
          </form>
        ) : (
          // Blog View Content
          <>
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
                  {new Date(blog.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {blog.views} views
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {blog.likes} likes
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Tags and Categories */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">Tags:</span>
                {blog.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-primaryColor/10 text-primaryColor hover:bg-primaryColor/20"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">Categories:</span>
                {blog.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="border-gray-300"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}