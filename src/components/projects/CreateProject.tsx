'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const buttonText = isAdditionalProject ? '£10.00' : 'Create';

  const FormSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(300),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true);

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

      toast({
        title: 'Project created!',
        description: `${data.name} as created.`,
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'There was a problem, please try again',
      });
    } finally {
      setIsLoading(false);
    }
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
                buttonText
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
