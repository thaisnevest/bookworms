'use client';

import React, { useState, useEffect } from "react";
import { Layout } from "components";
import PageTitle from "components/title";
import { CommentInput } from "components";
import Ranking from "components/ranking";
import { PostCard } from "components";
import Image from "next/image";

// Tipos de dados
interface PostData {
  postId: string;
  postText: string;
  author: string;
  date: string;
  image: string;
  groupId: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
}

interface RankingUser {
  id: string;
  name: string;
  image?: string;
  score: number;
  position: number;
}

interface RankingApiResponse {
  id: string;
  name: string;
  image?: string;
  score: number;
}

// Componente
const PublicationDetails = ({ postId }: { postId: string }) => {
  const [postData, setPostData] = useState<PostData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [rankingUsers, setRankingUsers] = useState<RankingUser[]>([]);
  const [userId, setUserId] = useState<string>("123");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        console.log("Post ID:", postId); // Verifique se o postId está correto
  if (!postId) {
    setError('ID do post inválido');
    setLoading(false);
    return;
  }
        // const postId="d9200f33-56ef-40a8-8647-8990b505be49"
      if (!postId) {
        setError('ID do post inválido');
        setLoading(false);
        return;
      }

      try {
        const postResponse = await fetch(`/api/posts/${postId}`);

        if (!postResponse.ok) {
          setError('Falha ao buscar os dados do post');
          setLoading(false);
          return;
        }
        const postData = await postResponse.json();
        console.log('Dados do post:', postData);

        if (!postData || !postData.id || !postData.title || !postData.authorId) {
          setError('Dados do post inválidos');
          setLoading(false);
          return;
        }

        const formattedPostData: PostData = {
          postId: postData.id,
          postText: postData.title,
          author: postData.authorId,
          date: postData.createdAt,
          image: postData.image,
          groupId: postData.groupId,
          comments: postData.comments || [],
        };

        setPostData(formattedPostData);
        setComments(postData.comments || []);

        const rankingResponse = await fetch(`/api/score/${postData.groupId}/ranking`);
        const rankingData: RankingApiResponse[] = await rankingResponse.json();
        console.log('Dados do ranking:', rankingData);

        const rankedUsers: RankingUser[] = rankingData.map((user, index) => ({
          id: user.id,
          name: user.name,
          image: user.image,
          score: user.score,
          position: index + 1,
        }));

        setRankingUsers(rankedUsers);
        setLoading(false);
      } catch (error) {
        setError('Erro ao buscar dados');
        setLoading(false);
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [postId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!postData) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout>
      <div className="flex flex-start mt-8 gap-[100px]">
        <div className="flex flex-col items-center min-h-screen ml-[100px]">
          <div className="mb-4">
            <PageTitle title="Detalhes da publicação" showBackButton={true} />
          </div>
          <div className="flex justify-center">
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
                postText={postData.postText}
                author={postData.author}
                date={postData.date}
                image={postData.image}
              />
              <CommentInput
                userId={userId}
                comments={comments}
                setComments={setComments}
              />
            </div>
          </div>
        </div>
        <div className="ml-[200px]">
          <Ranking users={rankingUsers} />
        </div>
      </div>
    </Layout>
  );
};

export default PublicationDetails;