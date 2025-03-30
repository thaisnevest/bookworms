Feature: Cadastro de usuário

    Scenario: Cadastro bem-sucedido com todos os campos válidos
        Given Eu estou na página de cadastro
        When Eu preencho o nome com "Joao Silva"
        And Eu preencho o username com "joaosilva"
        And Eu preencho o email com "joao@gmail.com"
        And Eu preencho a senha com "senhasegura"
        And Eu confirmo a senha com "senhasegura"
        And Eu seleciono uma imagem de perfil válida
        And Eu clico no botão "Cadastrar"
        Then Eu devo ser redirecionado para a página de login