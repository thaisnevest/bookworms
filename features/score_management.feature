Feature: Gerenciamento de pontos dentro de um grupo
    As a usuário membro de um grupo
    I want to acompanhar e gerenciar meus pontos
    So that eu possa entender minha posição no ranking e competir eficientemente

    Scenario: Ganho de pontos por páginas lidas
        Given Eu estou logado com o email "ana@gmail.com" e senha "1234#"
        And Eu participo do grupo de código "XYZKIO" com pontuação por "Página Lidas"
        And Eu estou na página "Grupo"
        And Eu vejo que minha pontuação atual no grupo é "10"
        When Eu seleciono a opção "Adicionar publicação"
        And Eu faço uma publicação com legenda "Leitura do dia" e número de páginas "35"
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que minha pontuação atual é "45"
    
    Scenario: Ganho de pontos por check-in
        Given Eu estou logado com o email "ana@gmail.com" e senha "1234#" no dia "12/12/24"
        And Eu participo do grupo de código "XYZKIO" com pontuação por "Check-in"
        And Eu estou na página "Grupo"
        And Eu vejo que minha pontuação atual no grupo é "10"
        And Eu ainda não tenho publicação no dia "12/12/24"
        When Eu seleciono a opção "Adicionar publicação"
        And Eu faço uma publicação com legenda "Leitura de hoje"
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que minha pontuação atual é "11"