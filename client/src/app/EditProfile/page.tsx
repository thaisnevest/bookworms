'use client';
import React from 'react';
import PageTitle from '../../components/title';
import { TextInput } from '../../components/text-input';
import { CustomButton } from '../../components/button';
import SidebarLayout from '../../components/sidebar';
import { FileUpload } from '../../components/picture-upload';
import { SidebarProvider } from 'components/ui/sidebar';

const EditProfilePage = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white w-screen">
        {/* Sidebar com largura fixa */}
        <div className="w-64 flex-shrink-0">
          <SidebarLayout />
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col">
          {/* PageTitle ocupando toda a largura */}
          <div className="w-full p-8 ">
            <PageTitle title="Edite seu perfil" showBackButton={true} />
          </div>

          {/* Conteúdo da página */}
          <div className="flex-1 p-8">
            {/* Foto e Botão de Salvar */}
            <div className="flex">
              {}
              <div className="w-1/3 ">
                <div className="flex flex-col items-center w-full ">
                  {}
                  <FileUpload
                    onFileSelect={(file) => console.log(file)}
                    label=""
                    width="100%"
                    height={337}
                  />

                  <div className="mt-4 w-[280px]">
                    <CustomButton
                      label="Salvar"
                      variant="borrow"
                      width="w-full"
                      onClick={() => console.log('Perfil salvo!')}
                    />
                  </div>
                </div>
              </div>

              {/* Nome, Username, E-mail, Biografia, FileUploads, Top 3 e Leitura Atual */}
              <div className="w-2/3 ml-8">
                {/* Seção de Nome, Username, E-mail e Biografia */}
                <div className="flex space-x-8">
                  {/* Nome, Username e E-mail */}
                  <div className="w-1/2 space-y-4">
                    <TextInput label="Nome" type="text" width="w-full" />
                    <TextInput label="Username" type="text" width="w-full" />
                    <TextInput label="E-mail" type="email" width="w-full" />
                  </div>

                  {/* Biografia */}
                  <div className="w-1/2 flex flex-col }">
                    <TextInput
                      label="Biografia"
                      type="text"
                      width="w-full"
                      height="h-full"
                      multiline={true}
                    />
                  </div>
                </div>

                {/* FileUploads e Top 3 / Leitura Atual */}
                <div className="flex mt-8">
                  {/* Top 3 e Leitura Atual */}
                  <div className="w-1/3">
                    {/* Top 3 */}
                    <div>
                      <h3 className="text-xl font-semibold text-borrowDark">
                        Top 3
                      </h3>
                      {/* <TextInput label="Top 1" type="text" width="w-full" />
                      <TextInput label="URL" type="text" width="w-full" />
                      <TextInput label="@" type="text" width="w-full" /> */}
                    </div>

                    {/* Leitura Atual */}
                    <div className="mt-[340px]">
                      <h3 className="text-xl font-semibold text-borrowDark">
                        Leitura Atual
                      </h3>
                      <div className="mt-9 flex space-x-4">
                        {/* Páginas totais */}
                        <TextInput
                          label="Páginas totais"
                          type="text"
                          width="w-1/3"
                        />
                        {/* Páginas lidas */}
                        <TextInput
                          label="Páginas lidas"
                          type="text"
                          width="w-1/3"
                        />
                      </div>
                    </div>
                  </div>

                  {/* FileUploads */}
                  <div className="w-2/3 ml-8">
                    <FileUpload
                      onFileSelect={(file) => console.log(file)}
                      label=""
                      width="100%"
                      height={337}
                    />
                    <div className="mt-8">
                      <FileUpload
                        onFileSelect={(file) => console.log(file)}
                        label=""
                        width="100%"
                        height={337}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EditProfilePage;
