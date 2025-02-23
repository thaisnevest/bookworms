Feature: Enter and leave groups
  As a user
  I want to be able to enter or leave a group

  Scenario: entrar em grupo 
    Given Há no sistema um grupo com "groupId": "1234" e "groupCode": "asd4F"
    And Há no sistema um usuário com "username": "juninho24", "groupId": "null", "id": "1111"
    When uma requisição PUT é feita para "/groups/enter/asd4F/1111"
    Then o status da resposta deve ser "200"
    And o sistema devolve a resposta "Usuario inserido no grupo"
    And Há no sistema um usuário com "username": "juninho24", "groupId": "1234", "id": "1111"

  # Scenario: sair de um grupo
  #   Given Há no sistema um usuário com '"username: juninho24", "groupId": "1111", "id": "1234"'
  #   When uma requisição PUT é feita para "groups/leave/1234"
  #   Then o status da resposta deve ser "200"
  #   And o sistema devolve a resposta "Usuario removido do grupo"
  #   And Há no sistema um usuário com '"username: juninho24", "groupId": "null", "id": "1234"'

  