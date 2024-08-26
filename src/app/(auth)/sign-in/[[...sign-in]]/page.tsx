import { SignIn } from '@clerk/nextjs';

import { authLayout } from '@/config/authLayout';

export default function SignInPage() {
  return <SignIn appearance={authLayout} />;
}
