'use client';

import { useState } from 'react';
import OnboardingForm from '../../components/OnBoarding';

export default function SignUpPage() {
  const [open, setOpen] = useState(true);      // show the modal immediately

  return (
    <>
      {open && (
        <OnboardingForm
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
