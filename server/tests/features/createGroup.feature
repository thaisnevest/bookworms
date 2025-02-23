Feature: Create and delete Groups
  As a user
  I want to be able to create groups and delete groups

  Scenario: deletar grupo
    Given Existe no sistema um grupo com "id": "9999"
    When uma requisição DELETE é feita para "/groups/9999"
    Then o status da resposta deve ser "200"
    And o sistema devolve a resposta "Grupo deletado"
    And não existe no sistema um grupo com "id": "9999"