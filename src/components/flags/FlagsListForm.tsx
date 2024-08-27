'use client';

import { Flag } from '@prisma/client';
import { useState } from 'react';

import { FlagToggle } from '@/components/flags/FlagToggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EnviromentType } from '@/types/EnviromentType';

type FlagsListFormProps = {
  flags: Flag[];
};

export const FlagsListForm = ({ flags }: FlagsListFormProps) => {
  const [env, setEnv] = useState<EnviromentType>(EnviromentType.development);

  const filteredFlags = flags.filter((flag) => flag.enviroment === env);

  const hasFlags = filteredFlags && filteredFlags.length > 0;

  return (
    <section className='mt-4'>
      <div className='bg-white rounded-xl p-4'>
        <Select
          defaultValue={env}
          onValueChange={(value) => setEnv(value as EnviromentType)}
        >
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
            {filteredFlags.map((flag) => (
              <FlagToggle key={flag.id} flag={flag} />
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
