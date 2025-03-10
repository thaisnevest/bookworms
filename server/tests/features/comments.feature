Feature: Gerenciamento de comentários em postagens
  As a user 
  I want to comment and view comments on posts.



  Scenario: criar comentário
    Given há um grupo no sistema com id "group1"
    And há um usuário no sistema com id "user1", username "gio" e groupId "group1"
    And há um post no sistema com id "post1", groupId "group1" e userId "user1"
    When uma requisição POST for enviada para "/comments" com o corpo da requisição sendo: 
    """
      {
        "postId": "post1",
        "authorId": "user1",
        "createdAt": "2025-02-22T12:00:00Z",
        "text": "Este é um comentário."
      }
    """
    Then o status da resposta deve ser "201"
    And a resposta deve conter a mensagem "Comentário criado com sucesso!"
    
      
  Scenario: editar comentário
    Given há um grupo no sistema com id "group2"
    And há um usuário no sistema com id "user2", username "thais" e groupId "group2"
    And há um post no sistema com id "post2", groupId "group2" e userId "user2"
    And há um comentário no sistema com id "comment2", postId "post2", authorId "user2", date "2025-03-22T12:00:00Z" e texto "Que livro legal"
    When uma requisição PUT for enviada para "/comments/comment2" com o corpo da requisição sendo: 
    """
      {
        "text": "Que livro bacana! Gostei muito"
      }
    """
    Then o status da resposta deve ser "200"
    And a resposta deve conter a mensagem "Comentário atualizado com sucesso"

  Scenario: deletar comentário
    Given há um grupo no sistema com id "group3"
    And há um usuário no sistema com id "user3", username "arthur" e groupId "group3"
    And há um post no sistema com id "post3", groupId "group3" e userId "user3"
    And há um comentário no sistema com id "comment3", postId "post3", authorId "user3", date "2025-01-10T12:00:00Z" e texto "Adorei esse livro!"
    When uma requisição DELETE for enviada para "/comments/comment3"
    Then o status da resposta deve ser "200"
    And a resposta deve conter a mensagem "Comentário deletado com sucesso"


  Scenario: não criar comentário com mais de 150 caracteres
    Given há um grupo no sistema com id "group4"
    And há um usuário no sistema com id "user4", username "maria" e groupId "group4"
    And há um post no sistema com id "post4", groupId "group4" e userId "user4"
    When uma requisição POST for enviada para "/comments" com o corpo da requisição sendo:
    """
    {
        "postId": "post4",
        "authorId": "user4",
        "text": "Este é um comentário muito longo que deve ultrapassar o limite de 150 caracteres. O objetivo deste teste é garantir que o sistema não permita a criação de comentários que sejam excessivamente longos e que isso retorne uma mensagem de erro adequada."
    }
    """
    Then o status da resposta deve ser "400"
    And a resposta deve conter a mensagem "Comentário deve ter no máximo 150 caracteres"


