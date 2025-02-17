Feature: updateGroup
  As a user
  I want to be able to create groups and delete groups

  Scenario: atualizar grupo
    Given Existe no sistema um grupo com "id": "9999", "nome": "grupoLegal"
    When uma requisição PUT é feita para "/groups/update/9999" com body "name": "superGrupo"
    Then o status da resposta deve ser "200"
    And o sistema devolve a resposta "Grupo atualizado"
    And não existe no sistema um grupo com "id": "9999", "nome": "grupoLegal"
    And existe no sistema um grupo com "id": "9999", "nome": "superGrupo"