'use client';
import { useForm, SubmitHandler, type FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CustomButton, TextInput } from 'components';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface FormData extends FieldValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>();

  const handleRegister: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao cadastrar');
        return;
      }

      router.push('/Login');
    } catch (error) {
      console.error('Failed to register', error);
      setError('Erro ao cadastrar');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#322828]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-row items-center justify-center">
          <h1 className="font-sacramento text-9xl text-[#703E30]">cadastro</h1>
        </div>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (data) => await handleRegister(data))}
        >
          <TextInput
            type="text"
            label="Nome"
            {...register('name', {
              required: 'Nome é obrigatório'
            })}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <TextInput
            type="text"
            label="Username"
            {...register('username', {
              required: 'Username é obrigatório'
            })}
            error={!!errors.username}
            errorMessage={errors.username?.message}
          />
          <TextInput
            type="email"
            label="Email"
            {...register('email', {
              required: 'Email é obrigatório'
            })}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <TextInput
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            {...register('password', {
              required: 'Senha é obrigatória'
            })}
            error={!!errors.password}
            errorMessage={errors.password?.message}
            icon={
              showPassword ? (
                <EyeOff
                  width={32}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  width={32}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )
            }
          />
          <TextInput
            type={showPassword ? 'text' : 'password'}
            label="Confirmar Senha"
            {...register('confirmPassword', {
              required: 'Confirmação de senha é obrigatória'
            })}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
          {error && (
            <p className="text-red-500 text-sm text-center">⚠︎ {error}</p>
          )}
          <CustomButton variant="borrow" label="Cadastrar" type="submit" />
          <p className="text-center text-borrow font-nunito font-semibold">
            Já possui conta?{' '}
            <a href="/Login" className="underline">
              Entrar
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
