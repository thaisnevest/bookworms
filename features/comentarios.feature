Feature: Gerenciamento de comentários em postagens

  Scenario: Adicionar um comentário em uma postagem
    Given Estou autenticada no sistema com o e-mail "giovanna@gmail.com" e a senha "p@ssword"
    And Faço parte do grupo de código "RZT123"
    And Acesso uma postagem do usuário "brunaveiga"
    When Insiro o texto "Adorei a recomendação deste livro!" como comentário na postagem
    Then O comentário "Adorei a recomendação deste livro!" deve ser associado à postagem
    And Deve exibir meu nome de usuário "gvnna", a data "15/12/2024" e a hora "14:30" no comentário

  Scenario: Tentar enviar um comentário vazio
    Given Estou autenticada no sistema com o e-mail "giovanna@gmail.com" e a senha "p@ssword123"
    And Faço parte do grupo de código "RZT123"
    And Acesso uma postagem com o título "Inspirador"
    When Tento enviar um comentário sem nenhum texto
    Then O sistema deve exibir uma mensagem de erro indicando "O comentário não pode estar vazio"
    And O comentário não deve ser associado à postagem

  Scenario: Visualizar comentários de uma postagem
    Given Estou logada no aplicativo com o e-mail “giovanna@gmail.com” e a senha “p@ssword”
    And Participo do grupo de código "ZRT123"
    And Estou visualizando uma postagem com o título “O melhor livro de 2024”
    When A página exibe os comentários da postagem
    Then Devem ser exibidos todos os comentários existentes, ordenados pelos mais recentes
    And Cada comentário deve exibir o nome de usuário, a mensagem do comentário e a data e hora da publicação
    And Reações com emojis como 👍 (gostei), ❤️ (amei) e 😂 (engraçado) devem estar visíveis com a contagem de reações ao lado de cada emoji

  Scenario: Editar meu comentário
    Given Estou logada no aplicativo com o e-mail “giovanna@gmail.com” e a senha “p@ssword”
    And Participo do grupo de código "TTT123"
    And Publiquei um comentário na postagem
    When Atualizo o comentário para “Amei a escolha do livro e já comprei um exemplar!”
    Then O comentário deve ser atualizado para “Amei a escolha do livro e já comprei um exemplar!”
    And O sistema deve registrar que o comentário foi editado, incluindo a data e hora da atualização
