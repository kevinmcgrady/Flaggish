import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';

type UseSubmitFormProps = {
  action: () => void;
  successToast: {
    title: string;
    description: string;
  };
};

export const useSubmitForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async ({ action, successToast }: UseSubmitFormProps) => {
    try {
      setIsLoading(true);
      await action();
      router.refresh();
      toast({
        title: successToast.title,
        description: successToast.description,
      });
    } catch (error) {
      toast({
        title: 'Oops!',
        description: 'There was an error, please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
