'use client';

import { Flag } from '@prisma/client';
import { Trash2 } from 'lucide-react';
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
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { deleteFlag } from '@/queries/flags/deleteFlag';

import { SubmitButton } from '../site/SubmitButton';

type DeleteProjectProps = {
  flag: Flag;
};

export const DeleteFlag = ({ flag }: DeleteProjectProps) => {
  const { isLoading, onSubmit } = useSubmitForm();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDeleteFlag = async () => {
    await onSubmit({
      successToast: {
        title: 'Deleted!',
        description: `${flag.name} was deleted.`,
      },
      callback: async () => {
        await deleteFlag(flag.projectId as string, flag.id);
        setIsOpen(false);
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
          <SubmitButton isLoading={isLoading} onClick={handleDeleteFlag}>
            Delete
          </SubmitButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
