'use client';
import { CustomButton, Layout, SelectInput, PaginationComponent, PostCard} from 'components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GroupCover } from '../../components';
import { GroupCoverImage } from 'assets';
import Ranking from 'components/ranking';
import { UserPostImage } from 'assets';


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
      <div className='flex flex-row p-10 justify-around'>
      {/* div do feed */}
      <div className="flex flex-col" >
        <GroupCover name={'clube do livro <3'} date={'Até 30 de janeiro'} type={'Páginas Lidas'} image={GroupCoverImage}/>

        {/* div de baixo */}
        <div className='flex flex-row gap-[150px] mt-10'>

          {/* botoes */}
          <div className='w-[321px] gap-4 flex flex-col'>
            <PaginationComponent/>
            <SelectInput placeholder={'Filtrar por usuário'} options={['nalaura', 'thaís', 'victor', 'tusca']}/>
            <CustomButton label={'+ Adicionar publicação'} variant={'dark'}/>
            <CustomButton label={'Sair do Grupo'} variant={'gray'}/>
          </div>

          {/* posts */}
          <div className = "h-[680px] overflow-auto scrollbar-none">
            <PostCard postText={'Estou lendo o livro X e estou amando!'} author={'AnaLaura'} date={'há 2 dias'} image={UserPostImage} />
            <PostCard postText={'Estou lendo o livro X e estou amando!'} author={'AnaLaura'} date={'há 2 dias'} image={UserPostImage} />
            <PostCard postText={'Estou lendo o livro X e estou amando!'} author={'AnaLaura'} date={'há 2 dias'} image={UserPostImage} />
            <PostCard postText={'Estou lendo o livro X e estou amando!'} author={'AnaLaura'} date={'há 2 dias'} image={UserPostImage} />
          </div>


        </div>

      </div>
      <p className="text-borrowDark font-nunito">{user?.name}</p>
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

    </Layout>
  );
}
