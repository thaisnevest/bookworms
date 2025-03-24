'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PublicationDetails from './PubliDetails/page';

export default function Home() {
  // const router = useRouter();
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.replace('/Login');
  //   }
  // });

  // if (session.status === 'authenticated') {
  //   router.replace('/PubliDetails');
  // }

  return (
    <p className="font-semibold text-4xl text-white">
  <PublicationDetails postId="d9200f33-56ef-40a8-8647-8990b505be49" />
</p>

  );
}
