import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { urls } from '@/core/urls';

export const DashboardNav = () => {
  return (
    <nav className='p-4 bg-white flex flex-col gap-y-4'>
      <Link className={buttonVariants()} href={urls.dashboard.flagsProd}>
        Flags
      </Link>
      <Link className={buttonVariants()} href={urls.dashboard.apiKeys}>
        API Keys
      </Link>
    </nav>
  );
};
