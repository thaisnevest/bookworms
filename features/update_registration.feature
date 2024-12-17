Feature: Atualizar cadastro de usuário
    As um usuário cadastrado
    I want to atualizar as informações do meu cadastro
    So that meu perfil reflita minhas preferências e informações atualizadas.


    Scenario: Atualizar o cadastro com sucesso
        Given que eu estou logado no sistema como um usuário cadastrado
        And estou na página de “Atualizar Cadastro”.
        When eu atualizo os campos “Nome” com “Victor Silva e Oliveira”, “Email” com “victor.novo@gmail.com”, “Username” com “Novo_Victor”, “Senha” com “nova123456”.
        And eu clico em “Atualizar Cadastro”.
        Then eu vejo a mensagem “Cadastro realizado com sucesso!”
        And minhas informações são exibidas atualizada na página “Perfil de Usuário”.