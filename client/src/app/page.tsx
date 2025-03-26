'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/Login');
    }
  });

  if (session.status === 'authenticated') {
    // Aqui, podemos redirecionar para a página de detalhes do post, passando o ID na URL
    router.push(`/PubliDetails?postId=15806686-ee13-41d9-8d7e-a94667172f5b`);
  }

  return (
    <p className="font-semibold text-4xl text-white">
      Bem-vindo! Aguarde enquanto redirecionamos...
    </p>
  );
}
