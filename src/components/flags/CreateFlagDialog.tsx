'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Enviroment } from '@prisma/client';
import { Plus } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { createFlag } from '@/queries/flags/createFlag';
import { EnviromentType } from '@/types/EnviromentType';

type CreateFlagDialogProps = {
  projectId: string;
  projectName: string;
};

export const CreateFlagDialog = ({
  projectId,
  projectName,
}: CreateFlagDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLoading, onSubmit } = useSubmitForm();

  const FormSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(300),
    enviroment: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmit({
      successToast: {
        title: 'Flag created!',
        description: `${data.name} was created`,
      },
      action: async () => {
        await createFlag(
          data.name,
          data.description,
          data.enviroment as Enviroment,
          projectId,
        );
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='icon'>
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new flag</DialogTitle>
          <DialogDescription>
            Complete the form below to add a new flag to {projectName}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
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

              <FormField
                control={form.control}
                name='enviroment'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enviroment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select the enviroment' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EnviromentType.production}>
                          Production
                        </SelectItem>
                        <SelectItem value={EnviromentType.development}>
                          Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton isLoading={isLoading}>Create</SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
