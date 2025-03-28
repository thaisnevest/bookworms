'use client';

import { FileUpload } from 'components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EndGroup from './EndGroup/page';


export default function Home() {
    const router = useRouter();
    const session = useSession({
      required: true,
      onUnauthenticated() {
        router.replace('/Login');
      }
    });

    if (session.status === 'authenticated') {
      router.replace('/Profile');
    }

  return (
    <div className="flex items-center justify-center h-screen w-full bg-borrow">
      <p className="font-semibold text-4xl text-white">bookworms</p>
    </div>
  );
}