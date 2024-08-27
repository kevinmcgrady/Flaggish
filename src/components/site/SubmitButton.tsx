import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  children: string;
  isLoading: boolean;
  onSubmit?: () => void;
};

export const SubmitButton = ({
  isLoading,
  children,
  onSubmit,
}: SubmitButtonProps) => {
  return (
    <Button onSubmit={onSubmit}>
      {isLoading ? <Loader2 size={15} className='animate-spin' /> : children}
    </Button>
  );
};
