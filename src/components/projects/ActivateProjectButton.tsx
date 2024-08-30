'use client';

import { Project } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createStripeSession } from '@/actions/payment/createSession';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type ActivateProjectButtonProps = {
  project: Project;
};

export const ActivateProjectButton = ({
  project,
}: ActivateProjectButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleActivate = async () => {
    try {
      setIsLoading(true);
      const url = await createStripeSession({ projectId: project.id });
      router.push(url as string);
    } catch (error) {
      toast({
        title: 'Oops!',
        description: 'There has been a problem, please try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button role='button' onClick={handleActivate}>
      {isLoading ? <Loader2 size={15} className='animate-spin' /> : 'Activate'}
    </Button>
  );
};
