'use client';
import { CustomButton, Layout, SelectInput, PaginationComponent} from 'components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GroupCover } from '../../components';
import { GroupCoverImage } from 'assets';


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
      <div className="mt-[43px] ml-[148px]" >
        <GroupCover name={'clube do livro <3'} date={'Até 30 de janeiro'} type={'Páginas Lidas'} image={GroupCoverImage}/>
        <div>
          <div className='w-[321px] mt-[40px] gap-4 flex flex-col'>
            <PaginationComponent/>
            <SelectInput placeholder={'Filtrar por usuário'} options={['nalaura', 'thaís', 'victor', 'tusca']}/>
            <CustomButton label={'+ Adicionar publicação'} variant={'dark'}/>
            <CustomButton label={'Sair do Grupo'} variant={'gray'}/>
          </div>

          <div className='w-]496px] m-[59px]'>
            {/* posts */}
          </div>
        </div>

        <div>

        </div>
      </div>
      <p className="text-borrowDark font-nunito">{user?.name}</p>
    </Layout>
  );
}
