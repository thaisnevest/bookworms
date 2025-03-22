Feature: interação com grupos
  As a usuário
  I want to participar e criar grupos
  So that eu possa interagir e competir com outros usuários


  Scenario: Consultar informações de um grupo
    Given existe no sistema um grupo com id "1234" e nome "grupoMassa"
    When é pedido ao sistema a informação do grupo de id "1234"
    Then o status da resposta deve ser "200"
    And o sistema retorna um JSON com nome "grupoMassa"
  
  Scenario: Falha ao consultar informações de um grupo
    Given não existe no sistema um grupo com id "1111"
    When é pedido ao sistema a informação do grupo de id "1111"
    Then o status da resposta deve ser "404"
    And o sistema retorna a mensagem "Grupo não encontrado"

  Scenario: Deletar grupo
    Given existe no sistema um grupo com id "2222" e nome "grupoDaora"
    When é pedido ao sistema para deletar o grupo com id "2222"
    Then o sistema retorna a mensagem "Grupo deletado"
    And não existe no sistema um grupo com id "2222"
