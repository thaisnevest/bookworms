'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CreateGroup from './CreateGroup/page';
import EndGroup from './EndGroup/page';

export default function Home() {
  // const router = useRouter();
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.replace('/Login');
  //   }
  // });

  // if (session.status === 'authenticated') {
  //   router.replace('/Profile');
  // }

  return (<CreateGroup />);
}
