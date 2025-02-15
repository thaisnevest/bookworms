Feature: Gerenciamento de pontos dentro de um grupo
    As a usuário membro de um grupo
    I want to acompanhar e gerenciar meus pontos
    So that eu possa entender minha posição no ranking e competir eficientemente

    # ------------------------------ GUI scenarios ------------------------------ #

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

    Scenario: Redução de pontos com páginas lidas
        Given Given Eu estou logado com o email "ana@gmail.com" e senha "1234#"
        And Eu participo do grupo de código "XYZKIO" com pontuação por "Página Lidas"
        And Eu estou na página "Grupo"
        And Eu vejo que minha pontuação atual no grupo é "45"
        When Eu expando minha publicação com legenda "Leitura do dia" e número de páginas "35"
        And Eu seleciono a opção "Exluir publicação"
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que minha pontuação atual é "10"

    Scenario: Redução de pontos com check-in
        Given Eu estou logado com o email "ana@gmail.com" e senha "1234#" no dia "12/12/24"
        And Eu participo do grupo de código "XYZKIO" com pontuação por "Check-in"
        And Eu estou na página "Grupo"
        And Eu vejo que minha pontuação atual no grupo é "10"
        And Eu vejo que tenho 1 única publicação no dia "12/12/24" com legenda "Leitura do dia"
        When Eu expando minha publicação com legenda "Leitura do dia"
        And Eu seleciono a opção "Exluir publicação"
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que minha pontuação atual é "9"
    
    Scenario: Sem mudança de pontos com páginas lidas
        Given Eu estou logado com o email "ana@gmail.com" e senha "1234#"
        And Eu participo do grupo de código "XYZKIO" com pontuação por "Página Lidas"
        And Eu estou na página "Grupo"
        And Eu vejo que minha pontuação atual no grupo é "10"
        When Eu seleciono a opção "Adicionar publicação"
        And Eu faço uma publicação com legenda "Leitura do dia" e número de páginas "0"
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que minha pontuação atual é "10"
    
    Scenario: Sem mudança de pontos com check-in
        Given Eu estou logado com o email "ana@gmail.com" e senha "1234#" no dia "12/12/24"
        And Eu participo do grupo de código "XYZKIO" com pontuação por "Check-in"
        And Eu estou na página "Grupo"
        And Eu vejo que minha pontuação atual no grupo é "10"
        And Eu vejo que tenho uma publicação no dia "12/12/24" com legenda "Leitura da manhã"
        When Eu seleciono a opção "Adicionar publicação"
        And Eu faço uma publicação com legenda "Leitura da tarde"
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que minha pontuação atual é "10"
    
    Scenario: Mudança de posição no ranking por ganho de pontos
        Given Eu estou logado com o email "ana@gmail.com" e senha "1234#"
        And Eu participo do grupo de código "XYZKIO"
        And Eu estou na página "Grupo"
        And Eu vejo que o usuário "Thaís" está em "1º lugar" no ranking com pontuação "12"
        And Eu vejo que o usuário "Arthur" está em "2º lugar" no ranking com pontuação "10"
        And Eu vejo que eu estou em "3º lugar" no ranking com pontuação "8"
        When Eu ganho "3" na pontuação
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que o usuário "Thaís" está em "1º lugar" no ranking com pontuação "12"
        And Eu vejo que eu estou em "2º lugar" no ranking com pontuação "11"
        And Eu vejo que o usuário "Arthur" está em "3º lugar" no ranking com pontuação "10"

    Scenario: Mudança de posição no ranking por perda de pontos
        Given Eu estou logado com o email "ana@gmail.com" e senha "1234#"
        And Eu participo do grupo de código "XYZKIO"
        And Eu estou na página "Grupo"
        And Eu vejo que o usuário "Thaís" está em "1º lugar" no ranking com pontuação "12"
        And Eu vejo que eu estou em "2º lugar" no ranking com pontuação "10"
        And Eu vejo que o usuário "Arthur" está em "2º lugar" no ranking com pontuação "8"
        When Eu perco "5" na pontuação
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que o usuário "Thaís" está em "1º lugar" no ranking com pontuação "12"
        And Eu vejo que o usuário "Arthur" está em "2º lugar" no ranking com pontuação "8"
        And Eu vejo que eu estou em "3º lugar" no ranking com pontuação "5"

    Scenario: Inalteração de posição no ranking 
        Given Eu estou logado com o email "ana@gmail.com" e senha "1234#"
        And Eu participo do grupo de código "XYZKIO"
        And Eu estou na página "Grupo"
        And Eu vejo que o usuário "Thaís" está em "1º lugar" no ranking com pontuação "12"
        And Eu vejo que o usuário "Arthur" está em "2º lugar" no ranking com pontuação "10"
        And Eu vejo que eu estou em "3º lugar" no ranking com pontuação "8"
        When Eu ganho "1" na pontuação
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que o usuário "Thaís" está em "1º lugar" no ranking com pontuação "12"O
        And Eu vejo que o usuário "Arthur" está em "2º lugar" no ranking com pontuação "10"
        And Eu vejo que eu estou em "3º lugar" no ranking com pontuação "9"
    
    Scenario: Empate de pontos
        Given Eu estou logado com o email "ana@gmail.com" e senha "1234#"
        And Eu participo do grupo de código "XYZKIO"
        And Eu estou na página "Grupo"
        And Eu vejo que o usuário "Thaís" está em "1º lugar" no ranking com pontuação "12"
        And Eu vejo que o usuário "Arthur" está em "2º lugar" no ranking com pontuação "10"
        And Eu vejo que eu estou em "3º lugar" no ranking com pontuação "8"
        When Eu ganho "2" na pontuação
        Then Eu ainda estou na página "Grupo"
        And Eu vejo que o usuário "Thaís" está em "1º lugar" no ranking com pontuação "12"
        And Eu vejo que o usuário "Arthur" está em "2º lugar" no ranking com pontuação "10"
        And Eu vejo que eu estou em "2º lugar" no ranking com pontuação "10"
    
    # ---------------------------- Service scenarios ---------------------------- #

    Scenario: Consultar ranking de um grupo
        Given o método getRanking do ScoreRepository retorna uma lista de usuários
        And há um grupo no sistema com '"id":"111"'
        And há um usuário no sistema com '"id":"123", "groupId":"111", "score":"0"'
        And há um usuário no sistema com '"id":"456", "groupId":"111", "score":"10"'
        And há um usuário no sistema com '"id":"789", "groupId":"111", "score":"20"'
        When uma requisição GET for enviada para "/score/ranking/111"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON com uma lista de usuários
        And o usuário com '"id":"789"' deve ser o primeiro elemento da lista
        And o usuário com '"id":"456"' deve ser o segundo elemento da lista
        And o usuário com '"id":"123"' deve ser o terceiro elemento da lista
    
    Scenario: Consultar ranking de um grupo que não existe
        Given o método getRanking do ScoreRepository retorna uma lista de usuários
        And não há um grupo no sistema com '"id":"111"'
        When uma requisição GET for enviada para "/score/ranking/111"
        Then o status da resposta deve ser "404"
        And a resposta deve conter a mensagem "Grupo não encontrado"
    
    Scenario: Incrementar a pontuação de um usuário depois de criar um post em grupo por check-in
        Given há um grupo no sistema com '"id":"111"'
        And há um usuário no sistema com '"id":"123","groupId":"111", "score":"0"'
        And há um post no sistema com '"id":"aaa","groupId":"111","userId":"123","createdAt":"2025-01-10"'
        When uma requisição PUT for enviada para "/score/createPost/111/123/aaa"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com '"id":"123","groupId":"111", "score":"1"'
        And a resposta deve contar a mensagem "Pontuação Atualizada!"

    Scenario: Inalterar a pontuação de um usuário depois de criar um post em grupo por check-in
        Given há um grupo no sistema com '"id":"111"'
        And há um usuário no sistema com '"id":"123","groupId":"111", "score":"1"'
        And há um post no sistema com '"id":"aaa","groupId":"111","userId":"123","createdAt":"2025-01-10"'
        And há um post no sistema com '"id":"bbb","groupId":"111","userId":"123","createdAt":"2025-01-10"'
        When uma requisição PUT for enviada para "/score/createPost/111/123/aaa"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com '"id":"123","groupId":"111", "score":"1"'
        And a resposta deve contar a mensagem "Pontuação Atualizada!"

    # Scenario: Alterar a pontuação de um usuário depois de atualizar um post em grupo por check-in
    #     Given há um grupo no sistema com '"id":"111"'
    #     And há um usuário no sistema com '"id":"123","groupId":"111", "score":"0"'
    #     And há um post no sistema com '"id":"aaa","groupId":"111","userId":"123","createdAt":"2025-01-10"'
    #     When uma requisição PUT for enviada para "/score/createPost/111/123/aaa"
    #     Then o status da resposta deve ser "200"
    #     And deve ser retornado um JSON contendo o usuário com '"id":"123","groupId":"111", "score":"1"'
    #     And a resposta deve contar a mensagem "Pontuação Atualizada!"
    
    Scenario: Reduzir a pontuação de um usuário depois de deletar um post em grupo por check-in
        Given há um grupo no sistema com '"id":"111"'
        And há um usuário no sistema com '"id":"123","groupId":"111", "score":"1"'
        And o post com '"id":"aaa","groupId":"111","userId":"123","numPages":"10"' foi deletado do sistema
        When uma requisição PUT for enviada para "/score/deletePost/111/123" com o corpo da requisição '"numPages":"10"'
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com '"id":"123","groupId":"111", "score":"0"'
        And a resposta deve contar a mensagem "Pontuação Atualizada!"

    Scenario: Incrementar a pontuação de um usuário depois de criar um post em grupo por páginas lidas
        Given há um grupo no sistema com '"id":"111"'
        And há um usuário no sistema com '"id":"123","groupId":"111", "score":"0"'
        And há um post no sistema com '"id":"aaa","groupId":"111","userId":"123","numPages":"10"'
        When uma requisição PUT for enviada para "/score/createPost/111/123/aaa"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com '"id":"123","groupId":"111", "score":"10"'
        And a resposta deve contar a mensagem "Pontuação Atualizada!"
    
    Scenario: Alterar a pontuação de um usuário depois de atualizar um post em grupo por páginas lidas
        Given há um grupo no sistema com '"id":"111"'
        And há um usuário no sistema com '"id":"123","groupId":"111", "score":"10"'
        And há um post no sistema com '"id":"aaa","groupId":"111","userId":"123","numPages":"10"' que foi atualizado para '"id":"aaa","groupId":"111","userId":"123","numPages":"20"'
        When uma requisição PUT for enviada para "/score/createPost/111/123/aaa"
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com '"id":"123","groupId":"111", "score":"20"'
        And a resposta deve contar a mensagem "Pontuação Atualizada!"
    
    Scenario: Reduzir a pontuação de um usuário depois de deletar um post em grupo por páginas lidas
        Given há um grupo no sistema com '"id":"111"'
        And há um usuário no sistema com '"id":"123","groupId":"111", "score":"10"'
        And o post com '"id":"aaa","groupId":"111","userId":"123","numPages":"10"' foi deletado do sistema
        When uma requisição PUT for enviada para "/score/deletePost/111/123" com o corpo da requisição '"numPages":"10"'
        Then o status da resposta deve ser "200"
        And deve ser retornado um JSON contendo o usuário com '"id":"123","groupId":"111", "score":"0"'
        And a resposta deve contar a mensagem "Pontuação Atualizada!"