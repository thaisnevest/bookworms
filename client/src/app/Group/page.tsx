'use client';
import { Layout } from 'components';
import Ranking from 'components/ranking';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const session = useSession({
    // required: true,
    onUnauthenticated() {
      router.replace('/Login');
    }
  });

  const user = session.data?.user;

  return (
    <Layout>
      <p className="text-borrowDark font-nunito">Group</p>
      <p className="text-borrowDark font-nunito">{user?.name}</p>
      <Ranking users={[{
        name: 'thais',
        id: 'aa',
        score: 0,
        position: 0
      }, {
        name: 'victor',
        id: '',
        score: 0,
        position: 0
      }]} />
    </Layout>
  );
}
