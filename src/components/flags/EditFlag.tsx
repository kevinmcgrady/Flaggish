'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flag } from '@prisma/client';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
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
import { updateFlagDetails } from '@/queries/flags/updateFlagDetails';

type EditFlagProps = {
  flag: Flag;
};

export const EditFlag = ({ flag }: EditFlagProps) => {
  const { isLoading, onSubmit } = useSubmitForm();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const FormSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(300),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: flag.name,
      description: flag.description,
    },
  });

  const handleUpdateFlag = async (data: z.infer<typeof FormSchema>) => {
    await onSubmit({
      successToast: {
        title: 'Flag updated!',
        description: `${data.name} was updated`,
      },
      action: async () => {
        await updateFlagDetails(
          flag.projectId as string,
          flag.id,
          data.name,
          data.description,
        );
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='icon' variant='outline'>
          <Pencil size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {flag.name}</DialogTitle>
          <DialogDescription>
            Complete the fields below to edit the flag. If you change the flag
            name, you will need to update your codebase with the new name.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateFlag)}
            className='w-full space-y-6'
          >
            <div className='space-y-4 mt-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flag Name</FormLabel>
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
                    <FormLabel>Flag Description</FormLabel>
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
