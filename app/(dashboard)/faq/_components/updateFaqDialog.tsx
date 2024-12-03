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
import { Textarea } from "@/components/ui/textarea";
import { updateFaq } from '@/lib/actions/faq';
import { Faq } from '@/lib/models/_faq_models';

interface UpdateFaqDialogProps {
  trigger: React.ReactNode;
  faq: Faq;
  onSuccess?: () => void;
}

export const UpdateFaqDialog: React.FC<UpdateFaqDialogProps> = ({
  trigger,
  faq,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.error('Question is required', {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'green',
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
      await updateFaq({
        id: faq.id,
        question: question.trim(),
        answer: answer.trim()
      });
      toast.success('FAQ updated successfully', {
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
      toast.error(error instanceof Error ? error.message : 'Failed to update FAQ', {
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

      <AlertDialogContent className="w-[95vw] max-w-[500px] p-3 md:p-4 bg-white rounded-lg border shadow-lg">
        <AlertDialogCancel className="absolute border-none right-2 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 hover:text-secondaryColor">
          <X className="h-4 w-4" />
        </AlertDialogCancel>

        <AlertDialogHeader className="space-y-2 mb-3">
          <AlertDialogTitle className="text-base font-semibold text-[#262424]">
            Edit FAQ
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-xs">
            Edit the FAQ by updating the information below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3">
          <div className="grid gap-1.5">
            <Label htmlFor="question" className="text-sm font-medium text-gray-700">
              Question
            </Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="answer" className="text-sm font-medium text-gray-700">
              Answer
            </Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[100px] border-gray-300 focus:border-primaryColor focus:ring-primaryColor/20"
            />
          </div>
        </div>

        <AlertDialogFooter className="gap-2 mt-4">
          <AlertDialogCancel 
            className="border border-gray-300 hover:bg-gray-50 text-sm py-1.5"
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleUpdate}
            className="bg-primaryColor hover:bg-primaryColor/90 text-white text-sm py-1.5"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save changes'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}; 