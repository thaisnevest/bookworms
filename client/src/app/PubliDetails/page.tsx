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
  text: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  createdAt?: string;
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

interface ApiCommentResponse {
  message: string;
  data: ApiComment[];
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
        console.log('Dados do post:', res.data); // Verifica toda a resposta
        console.log('Autor do post:', res.data.author); // Verifica o autor
        console.log('Imagem do autor:', res.data.author?.image); 
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
    const fetchComments = async () => {
      if (!postId) return;
      
      try {
        const res = await api.get<ApiCommentResponse>(`/comments/post/${postId}`);
        console.log('Dados dos comentários:', res.data.data);
        
        const formattedComments = res.data.data.map(comment => ({
          id: comment.id,
          text: comment.text,
          authorId: comment.authorId,
          author: {
            id: comment.author?.id || comment.authorId,
            name: comment.author?.name || 'Usuário Desconhecido',
            image: comment.author?.image || '/default-avatar.png'
          }
        }));
        
        setCom(formattedComments);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    };
  
    fetchComments();
  }, [postId]); // Agora só depende de postId

 

  

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
        <div className="flex flex-col items-center min-h-screen ml-[100px justify-center]">
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
                className="rounded-[20px]"
              />
            </div>

            <div className="flex flex-col">
              <PostCard
                postText={postData.body || postData.title}
                author={postData.author?.name || 'Autor desconhecido'}
                date={new Date(postData.createdAt).toLocaleDateString('pt-BR')}
                image={postData?.author.image || '/default-avatar.png'}
              />
              <CommentInput
                user={user || null}  // Passando o user como prop
                userId={user?.id || ''}
                comments={com}
                setComments={setCom}
                postId={postId}
              />
            </div>
          </div>
        ) : (
          <p>Carregando post...</p>
        )}
      </div>
        <div className="ml-[150px]">
          <Ranking users={rankingUsers} />
        </div>
      </div>
    </Layout>
  );
};

