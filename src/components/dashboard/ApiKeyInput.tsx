'use client';

import { Copy, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { generateKey } from '@/lib/generateApiKey';
import { ApiKeyType } from '@/types/ApiKeyType';

type ApiKeyInoutProps = {
  label: string;
  type: ApiKeyType;
  defaultApiKey: string;
};

export const ApiKeyInput = ({
  label,
  type,
  defaultApiKey,
}: ApiKeyInoutProps) => {
  const [apiKey, setApiKey] = useState<string>(defaultApiKey);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const { toast } = useToast();

  const handleGenerateApiKey = async () => {
    const key = await generateKey(type);
    setApiKey(key);
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
        Generate new key
      </Button>
    </section>
  );
};
