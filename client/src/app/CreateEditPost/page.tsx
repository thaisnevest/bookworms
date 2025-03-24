'use client';
 
import React, {useState} from "react";
import { Layout, TextInput } from "components";
import { Button } from "components/ui/button";
import Ranking from "components/ranking";
import PageTitle from "components/title";
import { FileUpload } from "components";
import { Woman2 } from "assets";
import api from "services/api";
import { useEffect } from "react";


export default function CreateEditPost() {
     const [title, setTitle] = useState("");
     const [numPages, setNumPages] = useState("");
     const [description, setDescription] = useState("");
     const [image, setImage] = useState<File | null>(null);
     const [users, setUsers] = useState<Array<{ id: string; name: string; image: string; score: number; position: number }>>([]);
 
     const handleCancel = () => {
         setTitle("");
         setNumPages("");
         setDescription("");
         setImage(null);
     };
 
     const handlePublish = async () => {
        try {
          const postData = {
            title,
            numPages: parseInt(numPages),  // Certifique-se de que o número de páginas é um número
            description,
            image,  // Suponho que o caminho da imagem seja salvo corretamente
            groupId: '123',  // Substitua pelo groupId real
            authorId: '123'  // Substitua pelo authorId real
          };
      
          const response = await api.post('/posts', postData);
          console.log('Post criado com sucesso', response.data);
        } catch (error) {
          console.error('Erro ao criar post', error);
        }
      };

     const handleFileSelect = (file: File) => {
        setImage(file);
        console.log(file);
      };

      interface User {
        id: string;
        name: string;
        image?: string;
        score: number;
        position: number;
      }

      useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users'); // Supondo que a API tenha essa rota
                const fetchedUsers = response.data.map((user: User, index: number) => ({
                    id: user.id,
                    name: user.name,
                    image: user.image || Woman2, 
                    score: user.score,
                    position: index + 1 
                }));
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Erro ao buscar usuários", error);
            }
        };

        fetchUsers();
    }, []);
      
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
                        <FileUpload
                        onFileSelect={handleFileSelect}
                        width={870}  
                        height={246} 
                        label="Foto"  
                        />
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