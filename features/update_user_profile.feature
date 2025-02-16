Feature: Atualizar perfil de usuário

As a usuário
I want to editar o meu perfil de usuário
So that eu possa customizar certos aspectos para que as pessoas me conheçam melhor

Scenario: Editar informações do perfil
Given eu estou na minha página de perfil logado com o email "luisx3@gmail.com" e senha "senha123"
And eu seleciono a opção "Editar Perfil"
When eu atualizo o campo "Bio" com "Amante de livros e aventuras literárias"
And eu salvo as alterações
Then eu deveria ver a mensagem "Perfil atualizado com sucesso"
And minha nova bio "Amante de livros e aventuras literárias" e exibida na página de perfil

Scenario: Cancelar mudancas feitas
Given eu estou na minha página de perfil logado com o email "luisx3@gmail.com" e senha "senha123"
And eu seleciono a opção "Editar Perfil"
When eu clico na opcao "Cancelar"
Then eu deveria ver a mensagem "Perfil nao foi atualizado"
And minhas informacoes de perfil permanecem inalteradas

Scenario: Falha ao editar perfil devido ao campo "Bio" vazio
Given eu estou na minha página de perfil logado com o email "luisx3@gmail.com" e senha "senha123" 
And eu seleciono a opção "Editar Perfil" 
When eu deixo o campo "Bio" vazio And eu salvo as alterações 
Then eu deveria ver uma mensagem de erro "O campo Bio não pode estar vazio" 
And as informações do perfil permanecem inalteradas 

Scenario: Falha ao editar perfil devido ao campo "Nome" muito longo
Given eu estou na minha página de perfil logado com o email "luisx3@gmail.com" e senha "senha123" 
And eu seleciono a opção "Editar Perfil" 
When eu preencho o campo "Nome" com mais caracteres que o permitido
And eu salvo as alterações 
Then eu deveria ver uma mensagem de erro "O nome excede o máximo permitido. Por favor tente encurta-lo" 
And as informações do perfil permanecem inalteradas 
