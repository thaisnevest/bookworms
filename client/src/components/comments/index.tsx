import React, { useState } from "react";
import { Edit3, Trash3, Woman2 } from "assets";
import Image from "next/image";

interface CommentInputProps {
  placeholder?: string;
  value?: string;
  userId: string; // Identificador do usuário atual
}

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
}

export function CommentInput({
  placeholder = "Adicione um comentário...",
  value,
  userId
}: CommentInputProps) {
  const [comment, setComment] = useState(value || ""); 
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      content: "Esse é meu comentário! Eu sou o autor.",
      authorId: userId, // Usuário logado
      authorName: "Usuário Atual",
      authorPhoto: Woman2,
    },
    {
      id: "2",
      content: "Sou outra pessoa comentando, não deveria ver os ícones.",
      authorId: "999", // Outro usuário
      authorName: "Outro Usuário",
      authorPhoto: Woman2,
    },
  ]); 

  // Função que trata o envio do comentário
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && comment.trim() !== "") {
      event.preventDefault(); 

      const newComment = {
        id: new Date().toISOString(), 
        content: comment,
        authorId: userId, 
        authorName: "Usuário Atual", 
        authorPhoto: Woman2 
      };

      setComments([...comments, newComment]);
      setComment(""); // Limpa o campo de entrada
    }
  };

  return (
    <div className="flex-col items-center">
      <div className="flex items-start">
        <textarea
          placeholder={placeholder}
          value={comment}
          onChange={(e) => setComment(e.target.value)} // Atualiza o valor enquanto o comentário não foi enviado
          onKeyDown={handleKeyDown}
          className="w-[351px] min-h-[67px] max-h-[200px] font-nunito text-graphiteGray border-none bg-gray rounded-[20px] p-2 resize-none overflow-y-auto text-[14px]"
        />
      </div>

      <div className="mt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-between items-center w-[351px] p-2 bg-gray rounded-[20px] mt-2">
            <Image
              src={comment.authorPhoto}  
              alt="author"
              width={50} 
              height={51} 
              className="rounded-full mr-3 ml-2"  
            />
            <div className="flex flex-col justify-between flex-grow break-words overflow-hidden">
              <span className="font-nunito text-[16px] font-semibold text-graphiteGray text-black">{comment.authorName}</span>
              <p className="text-[14px] font-nunito text-graphiteGray">{comment.content}</p>
            </div>
            {comment.authorId === userId && (
              <div className="flex ml-auto">
                <button className="flex-shrink-0 w-8 h-8 p-1">
                  <Image
                    src={Trash3}
                    alt="trash"
                    width={24}  
                    height={24} 
                  />
                </button>
                <button className="flex-shrink-0 w-8 h-8 ">
                  <Image
                    src={Edit3}
                    alt="edit"
                    width={32} 
                    height={32} 
                  />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}