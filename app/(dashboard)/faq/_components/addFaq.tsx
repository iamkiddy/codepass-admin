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
import { Textarea } from "@/components/ui/textarea";
import { createFaq } from '@/lib/actions/faq';

interface AddFaqDialogProps {
  onSuccess?: () => void;
}

export function AddFaqDialog({ onSuccess }: AddFaqDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
  };

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.error('Question is required', {
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

    if (!answer.trim()) {
      toast.error('Answer is required', {
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
      
      await createFaq({
        question: question.trim(),
        answer: answer.trim()
      });

      toast.success('FAQ created successfully', {
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
      toast.error(error instanceof Error ? error.message : 'Failed to create FAQ', {
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
        <Button className="bg-primaryColor hover:bg-primaryColor/90 text-white gap-2">
          <Plus className="h-4 w-4" />
          Add FAQ
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="sm:max-w-[425px] p-6 bg-white rounded-xl border shadow-lg">
        <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>

        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-xl font-semibold text-[#262424]">
            Add FAQ
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-sm">
            Create a new frequently asked question by filling out the information below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-6 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="question" className="text-sm font-medium text-gray-700">
              Question *
            </Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="answer" className="text-sm font-medium text-gray-700">
              Answer *
            </Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[100px] border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
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
