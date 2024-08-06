import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        layout: {
          socialButtonsVariant: 'iconButton',
          logoImageUrl: '/images/logo.png',
        },
      }}
    />
  );
}
