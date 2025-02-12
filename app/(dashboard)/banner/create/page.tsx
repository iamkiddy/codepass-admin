'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ui/image-upload";
import { createBanner } from '@/lib/actions/banner';
import { getEventUtils } from '@/lib/actions/event';
import { EventOption } from '@/lib/models/_event_models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateBannerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [event, setevent] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [events, setEvents] = useState<EventOption[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEventUtils();
        if (response?.data) {
          setEvents(response.data);
        } else {
          toast.error('Invalid events data received', {
            duration: 3000,
            position: 'top-center',
            style: {
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
            },
          });
        }
      } catch (error) {
        toast.error('Failed to fetch events', {
          duration: 3000,
          position: 'top-center',
          style: {
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
          },
        });
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

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

    if (!event) {
      toast.error('Event is required', {
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
      
      await createBanner({
        title: title.trim(),
        image,
        event,
        isFeatured,
        isActive
      });

      toast.success('Banner created successfully', {
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
      toast.error(error instanceof Error ? error.message : 'Failed to create banner', {
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
        <h1 className="text-2xl font-semibold">Create New Banner</h1>
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
              placeholder="Enter banner title..."
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="event" className="text-sm font-medium text-gray-700">
              Event *
            </Label>
            <Select
              value={event}
              onValueChange={setevent}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {events?.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
              Featured Banner
            </Label>
            <Switch
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active Banner
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
            {isLoading ? 'Creating...' : 'Create Banner'}
          </Button>
        </div>
      </form>
    </div>
  );
}
