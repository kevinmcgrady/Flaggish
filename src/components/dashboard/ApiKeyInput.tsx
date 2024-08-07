'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

  const handleGenerateApiKey = async () => {
    const key = await generateKey(type);
    setApiKey(key);
  };

  return (
    <section className='bg-white p-4 rounded-xl mt-4'>
      <Label>{label}</Label>
      <Input
        className='text-muted-foreground text-sm mt-2'
        readOnly
        value={apiKey}
      />

      <Button onClick={handleGenerateApiKey} className='mt-4'>
        Generate new client key
      </Button>
    </section>
  );
};
