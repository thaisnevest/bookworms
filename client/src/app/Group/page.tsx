'use client';
import { CustomButton, Layout, SelectInput, PaginationComponent} from 'components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GroupCover } from '../../components';
import { GroupCoverImage } from 'assets';
import Ranking from 'components/ranking';


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
      <div>

      </div>
      {/* div do feed */}
      <div className="mt-[43px] ml-[148px] flex flex-col" >
        <GroupCover name={'clube do livro <3'} date={'Até 30 de janeiro'} type={'Páginas Lidas'} image={GroupCoverImage}/>
        <div className='flex flex-row'>
          {/* botoes */}
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
          <Ranking users={[{
            name: 'AnaLaura',
            id: '',
            score: 100,
            position: 1
          }, {
            name: 'Thaís',
            id: '',
            score: 95,
            position: 2
          }]}/>
        </div>
      </div>
      <p className="text-borrowDark font-nunito">{user?.name}</p>
    </Layout>
  );
}
