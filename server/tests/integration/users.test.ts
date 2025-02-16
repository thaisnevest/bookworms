import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { connection } from '../Helper/database.config';
import app from '../../src/app';
import { afterAll, beforeAll, beforeEach, expect } from '@jest/globals';

const feature = loadFeature('../features/user_registration.feature');
defineFeature(feature, (test) => {
  let response;

  beforeAll(async () => {
    await connection.create();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Cadastro com todos os campos obrigatórios preenchidos.', ({
    given,
    when,
    then,
    and,
  }) => {
    given('que eu estou na página “Cadastro de Usuários”.', () => {});

    when('eu preencho os campos:', async (table) => {
      const [userData] = table;
      response = await request(app).post('/users').send(userData);
    });

    and('eu clico em “Cadastrar”.', () => {});

    then('eu vejo a mensagem “Cadastro realizado com sucesso”', () => {
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Cadastro realizado com sucesso');
    });

    and('sou redirecionado para a página “Login de Usuário”.', () => {
      expect(response.headers.location).toBe('/login');
    });
  });

  test('Cadastro com senha menor que o limite mínimo', ({
    given,
    when,
    then,
    and,
  }) => {
    given('eu estou na página de “Cadastro de Usuários”.', () => {});

    when('eu preencho os campos:', async (table) => {
      const [userData] = table;
      response = await request(app).post('/users').send(userData);
    });

    and('eu clico em “Cadastrar”.', () => {});

    then('vejo a mensagem “A senha deve conter no mínimo 6 caracteres”', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        'A senha deve conter no mínimo 6 caracteres',
      );
    });

    and('permaneço na página de “Cadastro de Usuário”.', () => {
      expect(response.body.stayOnPage).toBe(true);
    });
  });

  test('Cadastro com Username já existente.', ({ given, when, then, and }) => {
    given('eu estou na página de “Cadastro de Usuário”.', () => {});

    and('o usuário “VictorOliveira” já está cadastrado.', async () => {
      await request(app).post('/users').send({
        name: 'VictorOliveira',
        username: 'victoroi',
        email: 'victor@email.com',
        password: '123456',
        confirmPassword: '123456',
      });
    });

    when('eu preencho os campos:', async (table) => {
      const [userData] = table;
      response = await request(app).post('/users').send(userData);
    });

    and('eu clico em “Cadastrar”.', () => {});

    then('eu vejo a mensagem “Username já em Uso”.', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O username já está em uso');
    });

    and('permaneço na página de “Cadastro de Usuário”.', () => {
      expect(response.body.stayOnPage).toBe(true);
    });
  });

  test('Cadastro sem preencher campos obrigatórios.', ({
    given,
    when,
    then,
    and,
  }) => {
    given('eu estou na página de “Cadastro de Usuário”.', () => {});

    when('eu preencho os campos:', async (table) => {
      const [userData] = table;
      response = await request(app).post('/users').send(userData);
    });

    and('deixo em branco o campo “Email”.', () => {
      expect(response.body.errors).toContainEqual({
        field: 'email',
        message: 'Campo obrigatório não preenchido',
      });
    });

    and('eu clico em “Cadastrar”.', () => {});

    then(
      'eu vejo a mensagem de erro “Campo obrigatório não preenchido”.',
      () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Campo obrigatório não preenchido');
      },
    );

    and('permaneço na página de “Cadastro de Usuários”.', () => {
      expect(response.body.stayOnPage).toBe(true);
    });
  });
});
