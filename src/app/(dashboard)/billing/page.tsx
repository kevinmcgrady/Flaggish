import { Fragment } from 'react';

import { PageHeader } from '@/components/core/PageHeader';

export default async function BillingPage() {
  return (
    <Fragment>
      <PageHeader title='Billing' description='Manage your subscription' />
    </Fragment>
  );
}
