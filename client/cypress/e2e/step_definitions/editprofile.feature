Feature: Edição de perfil

    Background:
        Given Eu estou logado na aplicação

    Scenario: Alterar múltiplos campos do perfil
        Given Eu estou na página de edição de perfil
        When Eu preencho o nome com "Nome Atualizado"
        And Eu preencho o username com "victorsilvaa"
        And Eu preencho a biografia com "Nova biografia do usuário"
        And Eu preencho páginas totais com "300"
        And Eu preencho páginas lidas com "150"
        And Eu seleciono uma nova imagem de perfil
        And Eu clico no botão "Salvar"
        Then O nome deve ser atualizado para "Nome Atualizado"