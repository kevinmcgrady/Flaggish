'use client';

import { Project } from '@prisma/client';
import { Trash2 } from 'lucide-react';

import { deleteProject } from '@/actions/projects/deleteProject';
import { SubmitButton } from '@/components/site/SubmitButton';
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
import { useSubmitForm } from '@/hooks/useSubmitForm';

type DeleteProjectProps = {
  project: Project;
};

export const DeleteProject = ({ project }: DeleteProjectProps) => {
  const { isLoading, onSubmit } = useSubmitForm();

  const handleDeleteProject = async () => {
    await onSubmit({
      successToast: {
        title: 'Project deleted',
        description: `${project.name} was deleted`,
      },
      action: async () => {
        await deleteProject(project.id);
      },
    });
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
          <SubmitButton isLoading={isLoading} onClick={handleDeleteProject}>
            Delete
          </SubmitButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
