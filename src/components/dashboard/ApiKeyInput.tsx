'use client';

import { Copy, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { updateKey } from '@/queries/keys/updateKey';
import { ApiKeyType } from '@/types/ApiKeyType';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleGenerateApiKey = async () => {
    try {
      setIsLoading(true);
      await updateKey(projectId, type);
      router.refresh();
      toast({
        title: 'Key updated',
        description: 'Your key has been updated.',
      });
    } catch (error) {
      toast({
        title: 'Oops!',
        description: 'There was a problem, please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: 'Coppied!',
      description: 'Your api key has been coppied',
    });
  };

  const handleReveal = () => {
    setIsHidden((value) => !value);
  };

  return (
    <section className='bg-white p-4 rounded-xl mt-4'>
      <Label>{label}</Label>
      <div className='flex gap-4 items-center'>
        <Input
          className='text-muted-foreground text-sm mt-2'
          readOnly
          value={apiKey}
          type={isHidden ? 'password' : 'text'}
        />
        <div className='flex gap-2 mt-2'>
          <Button onClick={handleCopyToClipboard} variant='outline' size='icon'>
            <Copy size={15} />
          </Button>
          <Button onClick={handleReveal} variant='outline' size='icon'>
            {isHidden ? <Eye size={15} /> : <EyeOff size={15} />}
          </Button>
        </div>
      </div>

      <Button onClick={handleGenerateApiKey} className='mt-4'>
        {isLoading ? (
          <Loader2 size={15} className='animate-spin' />
        ) : (
          'Generate new key'
        )}
      </Button>
    </section>
  );
};
