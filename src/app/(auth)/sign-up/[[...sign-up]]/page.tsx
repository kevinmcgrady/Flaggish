import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        layout: {
          socialButtonsVariant: 'iconButton',
          logoImageUrl: '/images/logo.png',
        },
      }}
    />
  );
}
