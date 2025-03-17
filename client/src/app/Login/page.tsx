'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CustomButton, TextInput } from 'components';
import { Worm } from 'assets';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [emailORusername, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        emailORusername,
        password
      });
      console.log(result);

      if (result?.error) {
        console.error('Failed to login');
        return;
      }

      router.push('/Profile');
    } catch (error) {
      console.error('Failed to login');
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:flex items-end hidden md:h-screen w-full md:w-[50%] p-12 bg-borrowDark text-white text-3xl font-nunito font-thin">
        <h1>
          Transforme sua paixão por <span className="text-pink">leitura</span>{' '}
          em uma <span className="text-pink">competição</span> divertida!
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-[50%] bg-white h-screen p-[8%] ">
        <div className="flex flex-row w-full items-center justify-center gap-2">
          <Image src={Worm} alt="Worm" width={80} height={80} />
          <h1 className="font-sacramento text-borrow text-6xl">bookworms</h1>
        </div>
        <div className="flex-col w-full space-y-4">
          <TextInput
            type="text"
            label="Email ou Username"
            value={emailORusername}
            onChange={(e) => setUsername(e.target.value)}
            error
            errorMessage="Email ou Username inválido"
          />
          <TextInput
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton variant="borrow" label="Entrar" onClick={handleLogin} />
          <p className="flex justify-center text-borrow font-nunito font-semibold ">
            Não possui conta?{' '}
            <a href="/" className="underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
