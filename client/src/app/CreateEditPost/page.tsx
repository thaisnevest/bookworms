'use client';

import * as React from 'react';
import { Layout, TextInput } from "components";
import { Button } from "components/ui/button";
import PageTitle from "components/title";
import { FileUpload } from "components";
import api from "services/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from 'react-hook-form';



type FormData = {
    title: string;
    body?: string; // Opcional (tem o ? no schema)
    numPages: number;
    authorId: string;
    groupId: string; // Obrigatório (não tem ? no schema)
    imageFile: File; // Para o upload (será convertido para string URL depois)
  };
  

export default function CreateEditPost() {
    const router = useRouter();
    const session = useSession({
      required: true,
      onUnauthenticated() {
        router.replace('/Login');
      }
    });


    const user = session.data?.user;
    
    //const { register, handleSubmit, setValue } = useForm<FormData>();
    const [image, setImage] = React.useState<File | null>(null);

    
    // Adicione validações ao useForm
const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      numPages: 0
    }
  });
  
  // Modifique o handleSubmit para incluir melhor tratamento de erros
  const handlePublish: SubmitHandler<FormData> = async (data) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
  
      const formData = new FormData();
      
      // Campos exatos como no schema.prisma
      formData.append('title', data.title);
      if (data.body) formData.append('body', data.body); // Opcional
      formData.append('numPages', data.numPages.toString());
      formData.append('authorId', user.id);
      formData.append('groupId', data.groupId || user.groupId); // Obrigatório
      
      // Campo do arquivo (note que no schema é 'image' mas no FormData pode ser 'imageFile')
      if (image) {
        formData.append('imageFile', image); // O backend converterá para string URL
      }
  
      // Debug: verifique todos os campos enviados
      console.log('Dados sendo enviados:', {
        title: data.title,
        body: data.body,
        numPages: data.numPages,
        authorId: user.id,
        groupId: data.groupId || user.groupId,
        hasImage: !!image
      });
  
      const response = await api.post('/posts', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        }
      });
      
      // Exemplo de utilização:
      console.log('Post criado:', response.data);
      router.push(`/post/${response.data.id}`); // Redireciona para o post criado
  
      
    } catch (error) {
        console.error('Erro ao criar o post', error);
        // Adicione feedback visual para o usuário
      }
  };

    const handleCancel = () => {
        setValue('title', '');
        setValue('numPages', 0);
        setValue('body', '');
        setImage(null);
    };


    return (
        <Layout>
            <div className="flex gap-20 justify-center">
                <div className="flex flex-col items-center w-full max-w-[870px]">
                    <div className="flex mt-9 justify-center w-full">
                        <PageTitle title="Publicando no clube de livro" showBackButton={true} />
                    </div>
                    <form onSubmit={handleSubmit(handlePublish)} className="w-full">
                        <div className="flex gap-3 mt-12 ml-[8px]">
                        <TextInput 
                        label="Título da Publicação" 
                        type="text" 
                        width="w-[502px]" 
                        height="h-[50px]" 
                        {...register('title', { required: 'Título é obrigatório' })}
                        errorMessage={errors.title?.message}
                        />
                        <TextInput 
                            label="N° de páginas lidas" 
                            type="number" 
                            width="w-[353px]" 
                            height="h-[50px]" 
                            {...register('numPages',  { required: 'Numero de Paginas é obrigatório' })}
                            errorMessage={errors.numPages?.message}
                        />
                        </div>
                        <div className="mt-5 ml-[8px] w-[870px]">
                            <h2 className="text-borrow font-semibold font-nunito">Descrição</h2>
                            <textarea
                                {...register('body')}
                                className="w-full h-[100px] p-2 border bg-white border-gray rounded-md focus-visible:ring-neutral-400 font-nunito text-borrowDark"
                                rows={4}
                            />
                        </div>
                        <div className="mt-8">
                        <FileUpload
  onFileSelect={(file) => {
    // Verifique se o arquivo é válido antes de atualizar o estado
    if (file) {
      setImage(file);
    }
  }}
  width={870}
  height={246}
/>
                        </div>
                        <div className="flex gap-3 p-8 w-full justify-end ml-[55px] mt-9">
                            <Button 
                                type="button"
                                className="bg-gray w-[218px] h-[50px] font-nunito text-[20px] rounded-[10px]" 
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                type="submit"
                                className="bg-borrow text-white w-[218px] h-[50px] font-nunito text-[20px] rounded-[10px]" 
                            >
                               Publicar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

