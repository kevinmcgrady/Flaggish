'use client';

import { Copy, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { updateKey } from '@/queries/keys/updateKey';
import { ApiKeyType } from '@/types/ApiKeyType';

import { SubmitButton } from '../site/SubmitButton';

type ApiKeyInoutProps = {
  label: string;
  type: ApiKeyType;
  apiKey: string;
  projectId: string;
};

export const ApiKeyInput = ({
  label,
  type,
  apiKey,
  projectId,
}: ApiKeyInoutProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const { isLoading, onSubmit } = useSubmitForm();
  const { copyToClipboard } = useCopyToClipboard();

  const handleGenerateApiKey = async () => {
    await onSubmit({
      successToast: {
        title: 'Key updated',
        description: 'Your key has been updated.',
      },
      callback: async () => {
        await updateKey(projectId, type);
      },
    });
  };

  const handleCopyToClipboard = () => {
    copyToClipboard({
      textToCopy: apiKey,
      toastTitle: 'copied!',
      toastDescription: 'Your api key has been copied',
    });
  };

  const handleReveal = () => {
    setIsHidden((value) => !value);
  };

  return (
    <section className='bg-white p-4 rounded-xl mt-4 space-y-4'>
      <Label>{label}</Label>
      <div className='flex gap-4 items-center'>
        <Input
          className='text-muted-foreground text-sm'
          readOnly
          value={apiKey}
          type={isHidden ? 'password' : 'text'}
        />
        <div className='flex gap-2'>
          <Button onClick={handleReveal} variant='outline' size='icon'>
            {isHidden ? <Eye size={15} /> : <EyeOff size={15} />}
          </Button>
          <Button onClick={handleCopyToClipboard} variant='outline' size='icon'>
            <Copy size={15} />
          </Button>
        </div>
      </div>
      <SubmitButton isLoading={isLoading} onClick={handleGenerateApiKey}>
        Generate new key
      </SubmitButton>
    </section>
  );
};
