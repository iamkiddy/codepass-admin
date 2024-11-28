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
import { EventType } from '@/lib/models/_event_type_models';
import { deleteEventType } from '@/lib/actions/eventTypes';

interface DeleteEventTypeDialogProps {
  trigger: React.ReactElement;
  eventType: EventType;
  onSuccess?: () => void;
}

export const DeleteEventTypeDialog: React.FC<DeleteEventTypeDialogProps> = ({
  trigger,
  eventType,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await deleteEventType({ id: eventType.id });
      toast.success(response.message || 'Event type deleted successfully', {
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
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete event type';
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
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] p-6 bg-white rounded-xl border shadow-lg">
        <AlertDialogCancel className="absolute border-none right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 hover:text-secondaryColor">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-xl font-semibold text-[#262424]">
            Delete Event Type
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-sm">
            Are you sure you want to delete &quot;{eventType.name}&quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
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
}