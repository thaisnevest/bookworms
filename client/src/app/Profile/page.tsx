'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/Login');
    }
  });

  const user = session.data?.user;

  return (
    <div>
      <p>Profile</p>
      <p>{user?.name}</p>
    </div>
  );
}
