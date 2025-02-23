Feature: Gerenciamento de pontos dentro de um grupo
    As a usuário membro de um grupo
    I want to acompanhar e gerenciar meus pontos
    So that eu possa entender minha posição no ranking e competir eficientemente

    Scenario: Consultar ranking de um grupo
        Given há um grupo no sistema com id "111" e type "CHECKIN"
        And há um usuário no sistema com id "123", username "ana", groupId "111" e score "0"
        And há um usuário no sistema com id "456", username "thais", groupId "111" e score "10"
        And há um usuário no sistema com id "789", username "arthur", groupId "111" e score "20"
        When é feita uma busca do ranking do group de id "111"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON com uma lista de usuários
        And o usuário com id "789" deve ser o elemento "0" da lista
        And o usuário com id "456" deve ser o elemento "1" da lista
        And o usuário com id "123" deve ser o elemento "2" da lista
    
    Scenario: Consultar ranking de um grupo que não existe
        Given não há um grupo no sistema com id "111"
        When é feita uma busca do ranking do group de id "111"
        Then o status da resposta deve ser "404"
        And a resposta deve conter a mensagem "Grupo não encontrado"
    
    Scenario: Incrementar a pontuação de um usuário depois de criar um post em grupo por check-in
        Given há um grupo no sistema com id "111" e type "CHECKIN"
        And há um usuário no sistema com id "123", username "ana", groupId "111" e score "0"
        When é criado um post no sistema com id "aaa", groupId "111" e userId "123"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com id "123", groupId "111" e score "1"
        And a resposta deve conter a mensagem "Pontuação atualizada"

    Scenario: Inalterar a pontuação de um usuário depois de criar um post em grupo por check-in
        Given há um grupo no sistema com id "111" e type "CHECKIN"
        And há um usuário no sistema com id "123", username "ana", groupId "111" e score "1"
        And há um post no sistema com id "aaa", groupId "111" e userId "123" criado no dia atual
        When é criado um post no sistema com id "bbb", groupId "111" e userId "123"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com id "123", groupId "111" e score "1"
        And a resposta deve conter a mensagem "Pontuação atualizada"

    Scenario: Inalterar a pontuação de um usuário depois de atualizar um post em grupo por check-in
        Given há um grupo no sistema com id "111" e type "CHECKIN"
        And há um usuário no sistema com id "123", username "ana", groupId "111" e score "1"
        And há um post no sistema com id "aaa", groupId "111", userId "123" e numPages "10" criado no dia atual
        When é atualizado o número de páginas de um post no sistema com id "aaa", groupId "111", userId "123" de numPages "10" para numPages "20"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com id "123", groupId "111" e score "1"
        And a resposta deve conter a mensagem "Pontuação atualizada"
    
    Scenario: Reduzir a pontuação de um usuário depois de deletar um post em grupo por check-in
        Given há um grupo no sistema com id "111" e type "CHECKIN"
        And há um usuário no sistema com id "123", username "ana", groupId "111" e score "1"
        And há um post no sistema com id "aaa", groupId "111", userId "123" e numPages "10" criado no dia atual
        When é deletado um post do sistema com id "aaa", groupId "111", userId "123" e numPages "10"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com id "123", groupId "111" e score "0"
        And a resposta deve conter a mensagem "Pontuação atualizada"

    Scenario: Incrementar a pontuação de um usuário depois de criar um post em grupo por páginas lidas
        Given há um grupo no sistema com id "111" e type "PAGES"
        And há um usuário no sistema com id "123", username "ana", groupId "111" e score "0"
        When é criado um post no sistema com id "aaa", groupId "111", userId "123" e numPages "10"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com id "123", groupId "111" e score "10"
        And a resposta deve conter a mensagem "Pontuação atualizada"
    
    Scenario: Alterar a pontuação de um usuário depois de atualizar um post em grupo por páginas lidas
        Given há um grupo no sistema com id "111" e type "PAGES"
        And há um usuário no sistema com id "123", username "ana", groupId "111" e score "10"
        And há um post no sistema com id "aaa", groupId "111", userId "123" e numPages "10" criado no dia atual
        When é atualizado o número de páginas de um post no sistema com id "aaa", groupId "111", userId "123" de numPages "10" para numPages "20"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com id "123", groupId "111" e score "20"
        And a resposta deve conter a mensagem "Pontuação atualizada"
    
    Scenario: Reduzir a pontuação de um usuário depois de deletar um post em grupo por páginas lidas
        Given há um grupo no sistema com id "111" e type "PAGES"
        And há um usuário no sistema com id "123", username "ana", groupId "111" e score "10"
        And há um post no sistema com id "aaa", groupId "111", userId "123" e numPages "10" criado no dia atual
        When é deletado um post do sistema com id "aaa", groupId "111", userId "123" e numPages "10"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com id "123", groupId "111" e score "0"
        And a resposta deve conter a mensagem "Pontuação atualizada"