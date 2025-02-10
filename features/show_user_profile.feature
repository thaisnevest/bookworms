Feature: Mostrar perfil de usuario

As a usuário
I want to acessar o meu perfil e de outras pessoas
So that eu possa conhecer aspectos de outros usuários e eles possam conhecer os meus

Scenario: Acessar a página de perfil
Given eu estou logado com o email "luisx3@gmail.com" e senha "senha123"
When eu seleciono a opção "Meu Perfil" no menu principal
Then eu sou transferido para a minha página de perfil
And eu vejo todas minhas informações, como "Nome", "Foto de perfil", "Bio" e "e-mail"

Scenario: Visualizar perfis de outras pessoas
Given eu estou logado com o email "luisx3@gmail.com" e senha "senha123"
And eu estou na página inicial
When eu seleciono o perfil de outro usuário
Then eu sou transferido para a página de perfil deste usuário
And eu vejo informações como "Nome", "Foto de perfil", "Bio"
And eu nao posso ver o campo de "e-mail"

Scenario: Exibir o livro que o usuário está lendo atualmente
Given eu estou na página de perfil de "luisx3@gmail.com"
When eu navego até a seção "Lendo atualmente"
Then "Titulo","Autor" e "Porcentagem de leitura" são exibidos na nesta seção
Scenario: Nenhum livro está sendo lido atualmente

Given eu estou na página de perfil de "luisx3@gmail.com"
And nenhum livro está marcado como "lendo atualmente"
When eu navego até a seção "lendo atualmente"
Then uma mensagem informativa diz "nenhum livro está sendo lido no momento"

Scenario: Exibir livros favoritos do usuario (Top 3)
Given eu estou na página de perfil de "luisx3@gmail.com"
When eu navego até a seção "Favoritos"
Then eu vejo uma lista com os livros favoritos do usuário em destaque (Top 3)
And cada livro exibe a capa, título e autor

Scenario: Usuário possui menos que 3 livros favoritos 
Given eu estou na página de perfil de "joazinho_45@gmail.com"
When eu navego até a seção "Favoritos"
And o usuário possui 2 ou menos livros favoritos
Then eu vejo os livros favoritos do usuário exibidos em destaque
And cada livro exibe a capa, título e autor
And os espaços restantes da lista permanecem vazios

Scenario: Visualizar as publicações de um usuário
Given eu estou na página de perfil "joazinho_45@gmail.com"
When eu navego até a seção "Publicações"
Then eu vejo a lista de publicações feitas pelo usuário em ordem cronológica
And cada publicação exibe o titulo, conteudo, data e o número de interações (curtidas/comentarios)
And eu posso visualizar e interagir com as publicações