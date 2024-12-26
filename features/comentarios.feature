Feature: Gerenciamento de comentários em postagens

  Scenario: Adicionar um comentário em uma postagem
    Given Eu estou autenticada no sistema com o e-mail "giovanna@gmail.com" e a senha "p@ssword"
    And Eu faço parte do grupo de código "RZT123"
    And Eu acesso uma postagem do usuário "brunaveiga"
    When Eu insiro o texto "Adorei a recomendação deste livro!" como comentário na postagem
    And Confirmo o envio do comentário
    Then O comentário "Adorei a recomendação deste livro!" deve ser associado à postagem
    And Exibir meu nome de usuário "gvnna", a data "15/12/2024" e a hora "14:30" no comentário

  Scenario: Tentar enviar um comentário vazio
    Given Eu estou autenticada no sistema com o e-mail "giovanna@gmail.com" e a senha "p@ssword123"
    And Eu faço parte do grupo de código "RZT123"
    And Eu acesso uma postagem com o título "Inspirador"
    When Eu tento enviar um comentário sem nenhum texto
    Then O sistema deve exibir uma mensagem de erro indicando "O comentário não pode estar vazio"
    And O comentário não deve ser associado à postagem

  Scenario: Visualizar comentários de uma postagem
    Given que eu estou logado no aplicativo com o e-mail “giovanna@gmail.com” e a senha “p@ssword”
    And que eu participo do grupo de código "ZRT123"
    And que estou visualizando uma postagem com o título “O melhor livro de 2024”
    When eu rolar a página até a seção de comentários abaixo do conteúdo principal da postagem
    Then eu devo ver todos os comentários existentes ordenados pelos mais recentes
    And cada comentário deve exibir o nome de usuário, a mensagem do comentário e a data e hora da publicação
    And será possível ver reações com emojis, como 👍 (gostei), ❤️ (amei) e 😂 (engraçado), exibindo a contagem de reações ao lado de cada emoji

  Scenario: Editar meu comentário
    Given que eu estou logado no aplicativo com o e-mail “giovanna@gmail.com” e a senha “p@ssword”
    And que eu participo do grupo de código "TTT123"
    And que estou visualizando uma postagem com o título “Livro super empolgante”
    And que já publiquei um comentário com o texto “Adorei a escolha do livro!” na data “13/12/2024” e hora “13:00”
    And que o comentário possui um estado de "Editar" disponível
    When eu clicar na opção de editar abaixo do meu comentário
    And atualizar o texto para “Amei a escolha do livro e já comprei um exemplar!”
    And clicar em salvar
    Then o comentário atualizado “Amei a escolha do livro e já comprei um exemplar!” deve substituir o texto anterior
    And será registrado que o comentário foi editado, incluindo a data e hora da atualização