import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { urls } from '@/core/urls';

export const DashboardNav = () => {
  return (
    <nav className='p-4 bg-white flex flex-col gap-y-4'>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder='Project' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='light'>Project 1</SelectItem>
          <SelectItem value='dark'>Project 2</SelectItem>
          <SelectItem value='system'>Project 3</SelectItem>
        </SelectContent>
      </Select>
      <Link className={buttonVariants()} href={urls.dashboard.flags}>
        Flags
      </Link>
      <Link className={buttonVariants()} href={urls.dashboard.apiKeys}>
        API Keys
      </Link>
    </nav>
  );
};
