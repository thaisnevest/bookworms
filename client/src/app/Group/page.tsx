'use client';
import { useEffect, useState } from 'react';
import { CustomButton, Layout, SelectInput, PaginationComponent, PostCard } from 'components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GroupCover } from '../../components';
import { Close } from 'assets';
import Image from 'next/image';
import Ranking from 'components/ranking';
// import { UserPostImage } from 'assets';
import api from 'services/api';

interface Post {
  id: string;
  text: string;
  author: string;
  date: string;
  image: string;
}

interface RankingUser {
  id: string;
  name: string;
  image?: string;
  score: number;
  position: number;
}

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  score: number;
  bio: string;
  image: string;
  groupId: string;
}

interface ApiResponse {
  data: User[];
}

export default function Profile() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/Login');
    }
  });

  const user = session.data?.user;

  const [showPopup, setShowPopup] = useState(false);

  const handleLeaveGroupClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const leaveGroup = async () => {
    try {
      const res = await api.put(`/group/leave/${user?.id}`);
      if (!res.data) {
        throw new Error('Erro ao sair do grupo!');
      }

      setShowPopup(false);
      router.push('/NoGroup');
    } catch (error) {
      console.error(error);
      alert('Erro ao sair do grupo!');
    }
  };

  const [group, setGroup] = useState({
    id: '',
    name: '',
    date: new Date(),
    type: '',
    image: '',
  });

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const res = await api.get(`/groups/${user?.groupId}`);
        setGroup(res.data);
      } catch (error) {
        console.error('Erro ao buscar dados do grupo:', error);
      }
    };

    fetchGroupData();
  }, [user]);

  const handledate = (date: Date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString('pt-BR', { month: 'long' });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `Até ${day} de ${month} de ${year}`;
  };

  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const res = await api.get<ApiResponse>(`/score/ranking/${group.id}`);
        const data = res.data.data;
        const ranking = data.map((user, index) => ({
          id: user.id,
          name: user.name,
          image: user.image,
          score: user.score,
          position: index + 1,
        }));
        console.log('ranking', user?.groupId, data);
        setRanking(ranking);
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await api.get<Post[]>(`feed/groups/${group.id}`);
        setPosts(res.data); 
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchRankingData();
    fetchPosts(); 
  }, [user, group.id]);

  return (
    <Layout>
      <div className='flex flex-row p-10 justify-around'>
        {/* div do feed */}
        <div className="flex flex-col">
          <GroupCover name={group.name} date={handledate(group.date)} type={group.type} image={group.image} />

          {/* div de baixo */}
          <div className='flex flex-row gap-[150px] mt-10'>
            {/* botoes */}
            <div className='w-[321px] gap-4 flex flex-col'>
              <PaginationComponent />
              <SelectInput placeholder={'Filtrar por usuário'} options={['nalaura', 'thaís', 'victor', 'tusca']} />
              <CustomButton label={'+ Adicionar publicação'} variant={'dark'} />
              <CustomButton label={'Sair do Grupo'} variant={'gray'} onClick={handleLeaveGroupClick} />
            </div>

            {/* posts */}
            <div className="h-[680px] overflow-auto scrollbar-none">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  postText={post.text}
                  author={post.author}
                  date={post.date}
                  image={post.image}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-borrowDark font-nunito">{user?.name}</p>
        <Ranking users={ranking} />
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[480px] h-[180px] p-9 flex flex-col gap-8 rounded-[30px] shadow-2xl">
            <div className='flex flex-row justify-between gap-5'>
              <h1 className="font-nunito font-black text-start text-lg text-[#49423C]">Tem certeza que deseja sair do grupo?</h1>
              <button onClick={closePopup}>
                <Image src={Close} alt="close" />
              </button>
            </div>
            <div className="flex gap-6 justify-center mt-4">
              <CustomButton label="Cancelar" variant="gray" onClick={closePopup} />
              <CustomButton label="Sair do grupo" variant="borrow" onClick={leaveGroup} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
