// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineFeature, loadFeature } from 'jest-cucumber';
import { connection } from '../../src/Helper/database.config';
import app from '../../src/app';

const feature = loadFeature('./tests/features/user_registration.feature');
defineFeature(feature, (test) => {
  let response: request.Response;

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

    and('eu clico em “Cadastrar”.', () => {});

    then(
      'eu vejo a mensagem de erro “Campo obrigatório não preenchido”.',
      () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Campo obrigatório não preenchido');
      },
    );
  });
});
