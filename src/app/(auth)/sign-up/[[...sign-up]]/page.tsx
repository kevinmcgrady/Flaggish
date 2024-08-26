import { SignUp } from '@clerk/nextjs';

import { authLayout } from '@/config/authLayout';

export default function SignUpPage() {
  return <SignUp appearance={authLayout} />;
}
