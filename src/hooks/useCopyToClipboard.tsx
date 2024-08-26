import { useToast } from '@/components/ui/use-toast';

type CopyToClipboardProps = {
  textToCopy: string;
  toastTitle: string;
  toastDescription: string;
};

export const useCopyToClipboard = () => {
  const { toast } = useToast();
  const copyToClipboard = ({
    textToCopy,
    toastTitle,
    toastDescription,
  }: CopyToClipboardProps) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: toastTitle,
      description: toastDescription,
    });
  };

  return { copyToClipboard };
};
