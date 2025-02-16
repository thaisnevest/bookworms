# corrigido com as alterações solicitadas pelo professor
Feature: Cadastro de usuários
    As a um novo usuário
    I want to me cadastrar
    So that eu possa criar uma conta e acessar os recursos do sistema

    Scenario: Cadastro com todos os campos obrigatórios preenchidos.
        Given que eu estou na página “Cadastro de Usuários”.
        When eu preencho os campos:
            | name           | username | email            | password |
            | VictorOliveira | victoroi | victor@email.com | 123456   |
        And eu clico em “Cadastrar”.
        Then eu vejo a mensagem “Cadastro realizado com sucesso”

    Scenario: Cadastro com senha menor que o limite mínimo
        Given eu estou na página de “Cadastro de Usuários”.
        When eu preencho os campos:
            | name           | username | email            | password |
            | VictorOliveira | victoroi | victor@email.com | 123      |
        And eu clico em “Cadastrar”.
        Then vejo a mensagem “A senha deve conter no mínimo 6 caracteres”

    Scenario: Cadastro com username já existente.
        Given eu estou na página de “Cadastro de Usuário”.
        And o usuário “VictorOliveira” já está cadastrado.
        When eu preencho os campos:
            | name           | username | email            | password |
            | VictorOliveira | victoroi | victor@email.com | 123456   |
        And eu clico em “Cadastrar”.
        Then eu vejo a mensagem “Username já em Uso”.

    Scenario: Cadastro sem preencher campos obrigatórios.
        Given eu estou na página de “Cadastro de Usuário”.
        When eu preencho os campos:
            | name           | username | password |
            | VictorOliveira | victoroi | 123456   |
        And eu clico em “Cadastrar”.
        Then eu vejo a mensagem de erro “Campo obrigatório não preenchido”.
