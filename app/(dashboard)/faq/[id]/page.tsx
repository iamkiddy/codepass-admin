'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getFaq, updateFaq } from '@/lib/actions/faq';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Label } from "@/components/ui/label";
import { RichTextEditor } from '@/components/ui/richTextEditor';

export default function EditFaqPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        setIsLoading(true);
        const data = await getFaq(params.id as string);
        setQuestion(data.question);
        setAnswer(data.answer);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch FAQ";
        toast.error(errorMessage, {
          duration: 3000,
          position: 'top-center',
          style: {
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
          },
        });
        router.push('/faq');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchFaq();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
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
      await updateFaq({
        id: params.id as string,
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
      router.push('/faq');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update FAQ";
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Edit FAQ</h1>
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
            <Label htmlFor="question" className="text-sm font-medium text-gray-700">
              Question *
            </Label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here..."
              className="w-full px-3 py-2 border rounded-md"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="answer" className="text-sm font-medium text-gray-700">
              Answer *
            </Label>
            <RichTextEditor
              value={answer}
              onChange={setAnswer}
              placeholder="Enter your answer here..."
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