'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const FormSchema = z.object({
  marketing_emails: z.boolean(),
  security_emails: z.boolean(),
});

export default function FlagsPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <>
      <section className='bg-white p-4 rounded-xl flex justify-between'>
        <div>
          <h3 className='font-semibold text-2xl'>
            Feature Flags for Super Project
          </h3>
          <p className='font-light text-muted-foreground'>
            Toggle your feature flags below
          </p>
        </div>

        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='icon'>
                <Plus size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new flag</DialogTitle>
                <DialogDescription>
                  Complete the form below to add a new flag to Project 1
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className='mt-4'>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Select an enviroment' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='production'>production</SelectItem>
            <SelectItem value='development'>development</SelectItem>
          </SelectContent>
        </Select>

        <div className='bg-white p-4 rounded-xl mt-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='marketing_emails'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>
                          Marketing emails
                        </FormLabel>
                        <FormDescription>
                          Receive emails about new products, features, and more.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='security_emails'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>
                          Security emails
                        </FormLabel>
                        <FormDescription>
                          Receive emails about your account security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type='submit'>Update</Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
