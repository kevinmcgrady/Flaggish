'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Enviroment, Flag } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { urls } from '@/core/urls';

type FlagsListFormProps = {
  flags: Flag[];
  enviroment: Enviroment;
};

export const FlagsListForm = ({ flags, enviroment }: FlagsListFormProps) => {
  const router = useRouter();

  const hasFlags = flags && flags.length > 0;

  const FormSchema = z.object({
    marketing_emails: z.boolean(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      marketing_emails: true,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  const handleEnvChange = (value: Enviroment) => {
    const url =
      value === 'DEVELOPMENT'
        ? urls.dashboard.flagsDev
        : urls.dashboard.flagsProd;
    router.push(url);
  };

  return (
    <Fragment>
      <Select defaultValue={enviroment} onValueChange={handleEnvChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='PRODUCTION'>production</SelectItem>
          <SelectItem value='DEVELOPMENT'>development</SelectItem>
        </SelectContent>
      </Select>

      <div className='bg-white p-4 rounded-xl mt-4'>
        {hasFlags ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <div className='space-y-4'>
                {flags.map((flag) => (
                  <FormField
                    key={flag.id}
                    control={form.control}
                    name='marketing_emails'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                        <div className='space-y-0.5'>
                          <FormLabel className='text-base'>
                            {flag.name}
                          </FormLabel>
                          <FormDescription>{flag.description}</FormDescription>
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
                ))}
              </div>
              <Button type='submit'>Update</Button>
            </form>
          </Form>
        ) : (
          <p>Create your first flag to begin</p>
        )}
      </div>
    </Fragment>
  );
};
