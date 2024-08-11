import { Fragment } from 'react';

import { PageHeader } from '@/components/site/PageHeader';

export default async function BillingPage() {
  return (
    <Fragment>
      <PageHeader title='Billing' description='Manage your subscription' />
    </Fragment>
  );
}
