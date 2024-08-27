'use client';

import { Flag } from '@prisma/client';
import { Ellipsis } from 'lucide-react';

import { DeleteFlag } from '@/components/flags/DeleteFlag';
import { EditFlag } from '@/components/flags/EditFlag';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { updateFlag } from '@/queries/flags/updateFlag';

type FlagToggleProps = {
  flag: Flag;
};

export const FlagToggle = ({ flag }: FlagToggleProps) => {
  const { onSubmit } = useSubmitForm();

  const handleFlagUpdate = async (
    projectId: string,
    isToggled: boolean,
    flagId: string,
  ) => {
    await onSubmit({
      successToast: {
        title: 'Flag updated!',
        description: 'Your flag has been updated',
      },
      callback: async () => {
        await updateFlag(projectId, flagId, isToggled);
      },
    });
  };
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
      <div className='space-y-0.5'>
        <p className='text-base font-semibold'>{flag.name}</p>
        <p className='text-sm text-muted-foreground'>{flag.description}</p>
      </div>

      <div className='flex items-center gap-4'>
        <Switch
          defaultChecked={flag.isToggled}
          onCheckedChange={(checked) =>
            handleFlagUpdate(flag.projectId as string, checked, flag.id)
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
  );
};
