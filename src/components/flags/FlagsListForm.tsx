'use client';

import { Enviroment, Flag } from '@prisma/client';
import { Ellipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DeleteFlag } from '@/components/flags/DeleteFlag';
import { EditFlag } from '@/components/flags/EditFlag';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { urls } from '@/config/urls';
import { updateFlag } from '@/queries/flags/updateFlag';
import { EnviromentType } from '@/types/EnviromentType';

type FlagsListFormProps = {
  flags: Flag[];
  enviroment: Enviroment;
};

export const FlagsListForm = ({ flags, enviroment }: FlagsListFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const hasFlags = flags && flags.length > 0;

  const handleEnvChange = (value: Enviroment) => {
    const url =
      value === EnviromentType.development
        ? urls.dashboard.flagsDev
        : urls.dashboard.flagsProd;
    router.push(url);
  };

  const handleFlagUpdate = async (
    projectId: string,
    isToggled: boolean,
    flagId: string,
  ) => {
    try {
      await updateFlag(projectId, flagId, isToggled);
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'The flag has been updated.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'There was an error updating the flag, please try again',
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <section className='mt-4'>
      <div className='bg-white rounded-xl p-4'>
        <Select defaultValue={enviroment} onValueChange={handleEnvChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={EnviromentType.production}>
              production
            </SelectItem>
            <SelectItem value={EnviromentType.development}>
              development
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='bg-white p-4 rounded-xl mt-4'>
        {hasFlags ? (
          <div className='space-y-4'>
            {flags.map((flag) => (
              <div
                key={flag.id}
                className='flex flex-row items-center justify-between rounded-lg border p-4'
              >
                <div className='space-y-0.5'>
                  <p className='text-base font-semibold'>{flag.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    {flag.description}
                  </p>
                </div>

                <div className='flex items-center gap-4'>
                  <Switch
                    defaultChecked={flag.isToggled}
                    onCheckedChange={(checked) =>
                      handleFlagUpdate(
                        flag.projectId as string,
                        checked,
                        flag.id,
                      )
                    }
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant='outline' size='icon'>
                        <Ellipsis size={15} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-fit flex gap-4'>
                      <EditFlag flag={flag} />
                      <DeleteFlag flag={flag} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm text-muted-foreground'>
            Create your first flag to begin
          </p>
        )}
      </div>
    </section>
  );
};
