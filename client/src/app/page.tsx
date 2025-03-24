'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CreateEditPost from "./CreateEditPost/page";

export default function Home() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/Login');
    }
  });

  // Verificar se o usuário está autenticado
  if (session.status === 'authenticated') {
    return <CreateEditPost />; // Mostrar a página de criação/edição de post
  }

  // Caso o status não seja autenticado, mostre uma tela de carregamento ou redirecione
  return (
    <div className="flex items-center justify-center h-screen w-full bg-borrow">
      <p className="font-semibold text-4xl text-white">bookworms</p>
    </div>
  );
}
