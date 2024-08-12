'use client';

import { Project } from '@prisma/client';
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
import { deleteProject } from '@/queries/projects/deleteProject';

type DeleteProjectProps = {
  project: Project;
};

export const DeleteProject = ({ project }: DeleteProjectProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteProject = async () => {
    try {
      setIsLoading(true);
      await deleteProject(project.id);
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
            Are you sure you want to delete {project.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your flags from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDeleteProject}>
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
