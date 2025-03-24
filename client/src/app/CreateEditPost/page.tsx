'use client';
 
import {useState} from "react";
import { Layout, TextInput } from "components";
import { Button } from "components/ui/button";
import Ranking from "components/ranking";
import PageTitle from "components/title";
import { FileUpload } from "components";
import api from "services/api";
import { useEffect } from "react";
import { useSession } from "next-auth/react"; // Hook do NextAuth
import { useRouter } from "next/navigation"; // Para navegação
import * as React from 'react';


export default function CreateEditPost() {
    const { data: session } = useSession();
    const user = session?.user;
     const [title, setTitle] = useState("");
     const [numPages, setNumPages] = useState("");
     const [description, setDescription] = useState("");
     const [image, setImage] = useState<File | null>(null);
     const [users, setUsers] = useState<Array<{ id: string; name: string; image: string; score: number; position: number }>>([]);
     const router = useRouter();

     const handleCancel = () => {
         setTitle("");
         setNumPages("");
         setDescription("");
         setImage(null);
     };
 
     

const handlePublish = async () => {
    
    console.log('📌 Verificando valores antes da validação:');
    console.log("session.user:", session?.user);
    console.log('titulo:', title);
    console.log('nump:', numPages);
    console.log('descrição:', description);
    console.log('imagem:', image);
    console.log('user:', users);

    if (!title || !numPages) {
        alert('Por favor, preencha todos os campos obrigatórios.');
       
        return;
    }

    if (!session?.user) {
        alert('Usuário não autenticado');

        return;
    }

    if (users.length === 0) {
        alert('Nenhum usuário encontrado');
        
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('numPages', numPages);
    formData.append('description', description);

    if (image) {
        formData.append('image', image);
    }

    if (user?.id) {
        formData.append('authorId', user.id);
    } else {
        console.error('❌ Erro: Usuário não encontrado na sessão!');
        
        return;
    }

    if (user?.groupId) {
        formData.append('groupId', user.groupId);
    } else {
        console.warn('⚠️ Aviso: Usuário sem grupo associado!');
    }

    try {
        const response = await api.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Post criado com sucesso', response.data);
        router.push('/Posts'); // Redireciona para a lista de posts
    }catch (error) {
        if (error && typeof error === 'object' && 'response' in error) {
            const apiError = error as { response?: { data?: unknown } };
            console.error('Erro ao criar post:', apiError.response?.data || 'Erro desconhecido');
        } else {
            console.error('Erro ao criar post:', error);
        }
    }
};


useEffect(() => {
    console.log('Grupo do usuário:', session?.user?.groupId); // Verifique o groupId
    if (session?.user?.groupId) {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/groups/${session.user.groupId}/users`);
                console.log('Usuários retornados pela API:', response.data); // Verifique os dados
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao carregar os usuários', error);
            }
        };
        fetchUsers();
    } else {
        console.log('Grupo não encontrado para o usuário.');
    }
}, [session]);
    
    
     return (
        <Layout>
            <div className="flex gap-20 justify-center ">
                <div className="flex flex-col items-center w-full max-w-[870px]" >
                    <div className="flex mt-9  justify-center w-full">
                        <PageTitle title="Publicando no club de livro" showBackButton={true}></PageTitle>
                    </div>
                    <div className="flex gap-3 mt-12 ml-[8px]">
                         <TextInput label="Título da Publicação" type="text" width="w-[502px]" height="h-[50px]"  {...{ value: title, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value) }} ></TextInput>
                         <TextInput label="N° de páginas lidas" type="text" width="w-[353px]" height="h-[50px]" {...{ value: numPages, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNumPages(e.target.value) }}  ></TextInput>
                    </div>
                    <div className="mt-5 ml-[8px]">  
                        <TextInput label= "Descrição"  type="text" width="w-[870px]"  height="h-[100px]" {...{ value: description, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value) }} ></TextInput>
                    </div>
                    <div className="mt-8">
                        <FileUpload onFileSelect={(file) => setImage(file)} width={370} height={240} />
                    </div>
                    <div className="flex gap-3 p-8 w-full justify-end ml-[55px] mt-9">
                        <Button className="bg-gray w-[218px] h-[50px] font-nunito text-[20px] rounded-[10px]" onClick={handleCancel}>Cancelar</Button>
                        <Button className="bg-borrow text-white w-[218px] h-[50px] font-nunito text-[20px] rounded-[10px]" onClick={handlePublish}>Publicar</Button>
                    </div>
                    
                </div>
                <div className="mt-9  ml-[250px]">
                    <Ranking users={users} />
                </div>
            </div>
        </Layout>
    );
}