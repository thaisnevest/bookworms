'use client';
import { Layout } from 'components';
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
    <Layout>
      <p className="text-borrowDark font-nunito">Profile</p>
      <p className="text-borrowDark font-nunito">{user?.name}</p>
    </Layout>
  );
}
