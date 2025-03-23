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
  console.log(user?.groupId);

  return (
    <Layout>
      <p className="text-borrowDark font-nunito">Group</p>
      <p className="text-borrowDark font-nunito">{user?.name}</p>
      <p className="text-borrowDark font-nunito">{user?.email}</p>
      <p className="text-borrowDark font-nunito">{user?.bio}</p>
      <p className="text-borrowDark font-nunito">{user?.score}</p>
      <p className="text-borrowDark font-nunito">{user?.groupId}</p>
    </Layout>
  );
}
