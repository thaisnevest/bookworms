'use client';
import React from 'react';
import PageTitle from '../../components/title';
import { TextInput } from '../../components/text-input';
import { CustomButton } from '../../components/button';
import SidebarLayout from '../../components/sidebar';
import { FileUpload } from '../../components/picture-upload';
import { SidebarProvider } from 'components/ui/sidebar';

const EditProfilePage: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <SidebarLayout />
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 p-8">
          {/* PageTitle ao lado da Sidebar */}
          <PageTitle title="Edite seu perfil" showBackButton={true} />

          {/* Foto e Botão de Salvar */}
          <div className="flex mt-8">
            {/* Foto */}
            <div className="w-1/3">
              <img
                src="/caminho/para/sua/foto.jpg" // Substitua pelo caminho da sua foto
                alt="Foto do perfil"
                className="w-full h-auto rounded-lg"
              />
              <CustomButton
                label="Salvar"
                variant="borrow"
                width="w-full mt-4"
                onClick={() => console.log('Perfil salvo!')}
              />
            </div>

            {/* Nome, E-mail, Biografia, Top 3, Leitura Atual, Páginas Totais e Páginas Lidas */}
            <div className="w-2/3 ml-8">
              {/* Nome, E-mail e Biografia */}
              <div className="flex space-x-8">
                {/* Nome e E-mail */}
                <div className="w-1/2 space-y-4">
                  <TextInput
                    label="Nome"
                    type="text"
                    defaultValue="Luis x3"
                    width="w-full"
                  />
                  <TextInput
                    label="E-mail"
                    type="email"
                    defaultValue="luisx3@gmail.com"
                    width="w-full"
                  />
                </div>

                {/* Biografia */}
                <div className="w-1/2">
                  <TextInput
                    label="Biografia"
                    type="text"
                    defaultValue="Luís Lacords 21y - Live Laugh Love"
                    width="w-full"
                  />
                </div>
              </div>

              {/* FileUpload abaixo da Biografia */}
              <div className="mt-8">
                <FileUpload
                  onFileSelect={(file) => console.log(file)}
                  label="Foto 1"
                  width={446}
                  height={337}
                />
              </div>

              {/* Segundo FileUpload */}
              <div className="mt-8">
                <FileUpload
                  onFileSelect={(file) => console.log(file)}
                  label="Foto 2"
                  width={446}
                  height={337}
                />
              </div>

              {/* Top 3 */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-borrowDark">Top 3</h3>
                <TextInput
                  label="Top 1"
                  type="text"
                  defaultValue="Select a line of dog and dog here"
                  width="w-full"
                />
                <TextInput
                  label="URL"
                  type="text"
                  defaultValue="Find out the list that comes from inside"
                  width="w-full"
                />
                <TextInput
                  label="@"
                  type="text"
                  defaultValue="BIGFITHE_PRESS"
                  width="w-full"
                />
              </div>

              {/* Leitura Atual */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-borrowDark">
                  Leitura Atual
                </h3>
                <TextInput
                  label="Páginas totais"
                  type="number"
                  defaultValue="400"
                  width="w-full"
                />
                <TextInput
                  label="Páginas lidas"
                  type="number"
                  defaultValue="250"
                  width="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EditProfilePage;
