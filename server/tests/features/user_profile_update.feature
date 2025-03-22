Feature: Atualizar perfil de usuário

As a usuário
I want to editar o meu perfil de usuário
So that eu possa customizar certos aspectos para que as pessoas me conheçam melhor

Scenario: Editar informações do perfil
        Given eu estou na minha página de perfil logado:
            | name   | username | email            | password | id  |
            | luis   | luisx3   | luisx3@gmail.com | 123456   | 123 |
        And eu seleciono a opção "Editar Perfil"
        When eu atualizo os campos:
            | bio                                     |
            | Amante de livros e aventuras literárias |
        And eu salvo as alterações
        Then eu deveria ver a mensagem "Perfil atualizado com sucesso"
        And minha nova bio e exibida na página de perfil

Scenario: Cancelar alterações no perfil
        Given eu estou na minha página de perfil logado:
            | name | username | email            | password | id  |
            | luis | luisx3   | luisx3@gmail.com | 123456   | 123 |
        And eu seleciono a opção "Editar Perfil"
        When eu atualizo os campos:
            | bio                                     |
            | Amante de livros e aventuras literárias |
        And eu clico na opção "Cancelar"
        Then eu deveria ver a mensagem "Perfil não foi atualizado"
        And minha bio permanece a mesma na página de perfil