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
    Given Eu estou autenticada no sistema com o e-mail "giovanna@gmail.com" e a senha "p@ssword"
    And Eu faço parte do grupo de código "RZT123"
    And Eu acesso uma postagem com o título "Inspirador"
    When Eu tento enviar um comentário sem nenhum texto
    Then O sistema deve exibir uma mensagem de erro indicando "O comentário não pode estar vazio"
    And O comentário não deve ser associado à postagem
