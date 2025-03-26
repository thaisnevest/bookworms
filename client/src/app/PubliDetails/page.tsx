'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layout, PostCard, CommentInput } from 'components';
import { useSession } from 'next-auth/react';
import Ranking from 'components/ranking';
import PageTitle from 'components/title';
import Image from 'next/image';
import api from 'services/api';

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

interface ApiComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
}

interface Post {
  id: string;
  title: string;
  body?: string;
  image: string;
  createdAt: string;
  author: User;
  groupId: string;
}

interface RankingUser {
  id: string;
  name: string;
  image?: string;
  score: number;
  position: number;
}

interface ApiResponse {
  data: User[];
}

export default function PubliDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/Login');
    }
  });

  const user = session.data?.user;
  const [postData, setPostData] = useState<Post | null>(null);
  const [com, setCom] = useState<ApiComment[]>([]);
  const [rankingUsers, setRanking] = useState<RankingUser[]>([]);
  
  const [group, setGroup] = useState({
      id: '',
      name: '',
      duration: '',
      type: '',
      image: '',
    });
  // Busca os detalhes do post
  useEffect(() => {
    if (!postId) return;

    const fetchPostDetails = async () => {
      try {
        const res = await api.get<Post>(`/posts/${postId}`);
        setPostData(res.data);
        setGroup((prevGroup) => ({
          ...prevGroup,
          id: res.data.groupId, // Preenchendo o group.id com o valor de postData
        }));
      } catch (error) {
        console.error('Erro ao buscar detalhes do post:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  // Busca os comentários do post
  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        const res = await api.get<ApiComment[]>(`/posts/${postId}/comments`);
        setCom(res.data);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    };

    fetchComments();
  }, [postId]);

  

  // Busca o ranking dos usuários do grupo
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
  }, [group.id, user?.groupId]);

  return (
    <Layout>
      <div className="flex flex-start mt-8 gap-[100px]">
        <div className="flex flex-col items-center min-h-screen ml-[100px]">
          <div className="mb-4">
            <PageTitle title="Detalhes da publicação" showBackButton={true} />
          </div>
          {postData ? (
          <div className="flex justify-center gap-5 ml-[100px]">
            <div className="flex-shrink-0">
              <Image
                src={postData.image}
                alt="Descrição da imagem"
                width={500}
                height={440}
              />
            </div>

            <div className="flex flex-col">
              <PostCard
                postText={postData.body || postData.title}
                author={postData.author?.name || 'Autor desconhecido'}
                date={new Date(postData.createdAt).toLocaleDateString('pt-BR')}
                image={postData.author?.image || ''}
              />
              <CommentInput
                userId={user?.id || ''}
                comments={com}
                setComments={setCom}
              />
            </div>
          </div>
        ) : (
          <p>Carregando post...</p>
        )}
      </div>
        <div className="ml-[200px]">
          <Ranking users={rankingUsers} />
        </div>
      </div>
    </Layout>
  );
};

