'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SubmitButton } from '@/components/site/SubmitButton';
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
import { createStripeSession } from '@/queries/payment/createSession';
import { createProject } from '@/queries/projects/createProject';

type CreateProjectProps = {
  variant?: 'button' | 'icon';
  isAdditionalProject?: boolean;
};

export const CreateProject = ({
  variant = 'button',
  isAdditionalProject = false,
}: CreateProjectProps) => {
  const { isLoading, onSubmit } = useSubmitForm();
  const router = useRouter();

  const buttonText = isAdditionalProject ? 'Pay £10.00' : 'Create';

  const FormSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(300),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleCreateProject = async (data: z.infer<typeof FormSchema>) => {
    await onSubmit({
      successToast: {
        title: 'Project created!',
        description: `${data.name} as created.`,
      },
      callback: async () => {
        const project = await createProject({
          name: data.name,
          description: data.description,
          isActive: isAdditionalProject ? false : true,
        });

        if (!project) throw new Error();

        if (isAdditionalProject) {
          const url = await createStripeSession({
            projectId: project.id,
          });

          return router.push(url as string);
        }
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === 'button' ? (
          <Button>Create project</Button>
        ) : (
          <Button size='icon'>
            <Plus size={20} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>
            Complete the fields below to create your project
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateProject)}
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
            <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
