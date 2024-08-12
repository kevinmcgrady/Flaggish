'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '@prisma/client';
import { Loader2, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
import { useToast } from '@/components/ui/use-toast';
import { updateProjectDetails } from '@/queries/projects/updateProjectDetails';

const FormSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(300),
});

type UpdateProjectDetailsProps = {
  project: Project;
};

export const UpdateProjectDetails = ({
  project,
}: UpdateProjectDetailsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true);
      await updateProjectDetails(project.id, data.name, data.description);
      toast({
        title: 'Updated!',
        description: 'Your project was updated',
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'There was an problem, please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
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
            onSubmit={form.handleSubmit(onSubmit)}
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

            <Button type='submit'>
              {isLoading ? (
                <Loader2 size={15} className='animate-spin' />
              ) : (
                'Update'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
