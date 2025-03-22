'use client';
import { Layout } from 'components';
import { TextInput } from 'components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Calendar } from 'components';
import { CustomButton } from 'components';
import * as React from 'react';

type FormData = {
  nome: string;
  tipo: string;
  date: string;
}

export default function CreateGroup() {
  // const router = useRouter();
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.replace('/Login');
  //   }
  // });

  // const user = session.data?.user;

  const { register, handleSubmit } = useForm<FormData>();


  const handleFunc: SubmitHandler<FormData> = (data) => { console.log(data) };

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Layout>
      <div className=" flex flex-row w-full h-full">
        <div className="basis-3/4 flex flex-col">
          <div className="basis-1/6 flex justify-center items-center">
            <div className="w-4/5 h-4/5 content-center">
              <h1 className=" text-[#49423C] font-nunito font-extrabold text-[24px]">Nos fale sobre o seu grupo</h1>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleFunc)} className="basis-5/6 flex flex-col">
            <div className="basis-1/6 flex flex-row">
              <div className="basis-2/3 flex justify-center">
                <div className="w-4/5 h-4/5">
                  <TextInput
                    type="text"
                    label="Nome"
                    {...register('nome')}
                  />
                </div>
              </div>
              <div className="basis-1/3 flex flex-col">
                <label className="text-borrow font-semibold font-nunito">Tipo</label>
                <select {...register('tipo')} className="bg-transparent border border-gray focus-visible:ring-neutral-400 rounded-lg font-nunito text-borrowDark h-[40px] w-full">
                  <option className="font-nunito" selected>Tipo de jogo</option>
                  <option className="font-nunito" value="CHECKIN">Check-in</option>
                  <option className="font-nunito" value="PAGES">Paginas</option>
                </select>
              </div>
            </div>
            <div className="basis-2/3  flex flex-row">
              <div className="basis-1/2 flex flex-col justify-center items-center">
                <div className="w-4/6 h-full ">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-stone-200 w-full h-full"
                    {...register('date')}
                  />
                </div>
              </div>
              <div className="basis-1/2"></div>
            </div>
          </form>
        </div>
        <div className="basis-1/4 flex justify-center items-center">
          <div className="w-3/4 h-5/6 bg-borrow rounded-[16px]"></div>
        </div>
      </div>
    </Layout>
  );
}
