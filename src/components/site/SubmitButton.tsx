import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  children: string;
  isLoading: boolean;
  onClick?: () => void;
};

export const SubmitButton = ({
  isLoading,
  children,
  onClick,
}: SubmitButtonProps) => {
  return (
    <Button type='submit' onClick={onClick}>
      {isLoading ? (
        <Loader2 data-testid='loader' size={15} className='animate-spin' />
      ) : (
        children
      )}
    </Button>
  );
};
