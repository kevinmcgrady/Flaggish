import { Fragment } from 'react';

import { ApiKeyInput } from '@/components/dashboard/ApiKeyInout';
import { ApiKeyType } from '@/types/ApiKeyType';

export default function ApiKeysPage() {
  return (
    <Fragment>
      <section className='bg-white p-4 rounded-xl'>
        <h3 className='font-semibold text-2xl'>API Keys</h3>
        <p className='font-light text-muted-foreground'>
          Generate API keys to access feature flags
        </p>
      </section>

      <ApiKeyInput label='Client Key' type={ApiKeyType.client} />
      <ApiKeyInput label='Secret Key' type={ApiKeyType.secret} />
    </Fragment>
  );
}
