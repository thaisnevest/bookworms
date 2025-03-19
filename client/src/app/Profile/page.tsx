'use client';
import { CustomButton } from 'components';
import { signOut, useSession } from 'next-auth/react';
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

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/Login');
    } catch (error) {
      console.error('Failed to logout');
    }
  };

  return (
    <div>
      <p>Profile</p>
      <p>{user?.name}</p>
      <CustomButton label="Logout" variant="gray" onClick={handleLogout} />
    </div>
  );
}
