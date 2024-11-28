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
import { createEventType } from '@/lib/actions/eventTypes';

interface AddEventTypeDialogProps {
  onSuccess?: () => void;  // Callback for when event type is successfully created
}

export function AddEventTypeDialog({ onSuccess }: AddEventTypeDialogProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await createEventType({ name: name.trim() });
      toast.success(response.message || 'Event type created successfully', {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
        },
      });
      setName('');
      setIsOpen(false);
      onSuccess?.();
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create event type';
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

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          className="bg-primaryColor hover:bg-primaryColor/90 text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Event Type
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] p-6 bg-white rounded-xl border shadow-lg">
        <AlertDialogCancel className="absolute border-none right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 hover:text-secondaryColor">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-xl font-semibold text-[#262424]">
            Add New Event Type
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-sm">
            Create a new event type by entering a name below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter event type name"
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
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
            onClick={handleSubmit}
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