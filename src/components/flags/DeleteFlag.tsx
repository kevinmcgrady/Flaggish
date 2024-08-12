'use client';

import { Flag } from '@prisma/client';
import { Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { deleteFlag } from '@/queries/flags/deleteFlag';

type DeleteProjectProps = {
  flag: Flag;
};

export const DeleteFlag = ({ flag }: DeleteProjectProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteFlag = async () => {
    try {
      setIsLoading(true);
      await deleteFlag(flag.projectId as string, flag.id);
      toast({
        title: 'Deleted!',
        description: `${flag.name} was deleted.`,
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'There was a problem, please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='icon' variant='outline'>
          <Trash2 size={15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {flag.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your flag
            and it will no longer work in your codebase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDeleteFlag}>
            {isLoading ? (
              <Loader2 size={15} className='animate-spin' />
            ) : (
              'Delete'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
