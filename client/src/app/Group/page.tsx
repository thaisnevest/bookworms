'use client';
import { useEffect, useState } from 'react';
import { CustomButton, Layout, SelectInput, PaginationComponent, PostCard } from 'components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GroupCover } from '../../components';
import { Close, UserPostImage } from 'assets';
import Image from 'next/image';
import Ranking from 'components/ranking';
import api from 'services/api';

interface Post {
  id: string;
  title: string;
  authorId: string;
  author?: User;
  createdAt: string;
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
  const [groupUsers, setGroupUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleLeaveGroupClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const leaveGroup = async () => {
    try {
      const res = await api.put(`/groups/leave/${user?.id}`);
      if (!res.data) {
        console.error('Erro ao sair do grupo!');
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
    duration: '',
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

  const handledate = (dateString: string): string => {
    const newDate = new Date(dateString);
    const day = newDate.getDate();
    const month = newDate.toLocaleString('pt-BR', { month: 'long' });
    const year = newDate.getFullYear();
    return `Até ${day} de ${month} de ${year}`;
  };

  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchAuthorDetails = async (authorId: string): Promise<User> => {
    try {
      const res = await api.get<User>(`/users/${authorId}`);
      return res.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do autor:', error);
      throw error;
    }
  };

  const fetchPosts = async () => {
    console.log('fetchPosts chamado com selectedUser:', selectedUser);
    try {
      let res;

      if (selectedUser !== null) {
        res = await api.get<Post[]>(`feed/groups/${group.id}/user/${selectedUser}`);
      } else {
        res = await api.get<Post[]>(`feed/groups/${group.id}`)
      }

      const postsWithAuthors = await Promise.all(
        res.data.map(async (post) => {
          const author = await fetchAuthorDetails(post.authorId);
          return {
            ...post,
            author,
          };
        })
      );

      setPosts(postsWithAuthors);

      if (selectedUser === null) {
        const uniqueAuthors = postsWithAuthors
          .map(post => post.author)
          .filter((author, index, self) =>
            author && self.findIndex(a => a?.id === author.id) === index
          ) as User[];

          setGroupUsers(uniqueAuthors);
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

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

    fetchRankingData();
    fetchPosts();
  }, [user, group.id, selectedUser]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('pt-BR', { month: 'short' });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} de ${month}, ${hours}h${minutes}`;
  };

  return (
    <Layout>
      <div className='flex flex-row p-10 justify-around'>
        <div className="flex flex-col">
          <GroupCover name={group.name} date={handledate(group.duration)} type={group.type} image={group.image} />

          <div className='flex flex-row gap-[150px] mt-10'>
            <div className='w-[321px] gap-4 flex flex-col'>
              <PaginationComponent />
              <SelectInput
                placeholder={'Filtrar por usuário'}
                options={groupUsers.map(user => user.name)}
                onChange={(selectedUserName) => {
                  console.log('Nome selecionado:', selectedUserName);
                  const selectedUser = groupUsers.find(user => user.name === selectedUserName);
                  setSelectedUser(selectedUser ? selectedUser.id : null);
                  console.log('Usuário encontrado:', selectedUser);
                }}
              />
              <CustomButton label={'+ Adicionar publicação'} variant={'dark'} onClick={() => router.push('/CreateEditPost')} />
              <CustomButton label={'Sair do Grupo'} variant={'gray'} onClick={handleLeaveGroupClick} />
            </div>

            <div className="h-[680px] overflow-auto scrollbar-none">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  postText={post.title}
                  author={post.author?.name || 'Unknown Author'}
                  date={formatDate(post.createdAt)}
                  image={UserPostImage}
                />
              ))}
            </div>
          </div>
        </div>
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
