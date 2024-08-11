import type React from 'react';

type PageHeaderProps = {
  title: string;
  description: string;
  ctaComponent?: React.ReactNode;
};

export const PageHeader = ({
  title,
  description,
  ctaComponent,
}: PageHeaderProps) => {
  return (
    <section className='bg-white p-4 rounded-xl flex justify-between'>
      <div>
        <h3 className='font-semibold text-2xl'>{title}</h3>
        <p className='font-light text-muted-foreground'>{description}</p>
      </div>
      {ctaComponent && ctaComponent}
    </section>
  );
};
