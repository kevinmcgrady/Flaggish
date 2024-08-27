'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '@prisma/client';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { updateProjectDetails } from '@/queries/projects/updateProjectDetails';

import { SubmitButton } from '../site/SubmitButton';

type UpdateProjectDetailsProps = {
  project: Project;
};

export const UpdateProjectDetails = ({
  project,
}: UpdateProjectDetailsProps) => {
  const { isLoading, onSubmit } = useSubmitForm();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const FormSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(300),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  });

  const handleUpdateProject = async (data: z.infer<typeof FormSchema>) => {
    await onSubmit({
      successToast: {
        title: 'updated!',
        description: 'Your project was updated',
      },
      callback: async () => {
        await updateProjectDetails(project.id, data.name, data.description);
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Pencil size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update {project.name}</DialogTitle>
          <DialogDescription>
            Complete the fields to update {project.name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateProject)}
            className='w-full space-y-6'
          >
            <div className='space-y-4 mt-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton isLoading={isLoading}>Update</SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
