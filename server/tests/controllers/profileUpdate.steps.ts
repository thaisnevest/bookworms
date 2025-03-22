// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineFeature, loadFeature } from 'jest-cucumber';
import { connection } from '../../src/database/database.config';
import app from '../../src/app';

const feature = loadFeature('./tests/features/user_profile_update.feature');
defineFeature(feature, (test) => {
  let response: request.Response;
  let userId : number | undefined;

  beforeAll(async () => {
    await connection.create();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Editar informações do perfil', ({ given, when, then, and }) => {
          
      given('eu estou na minha página de perfil logado:', async (table) => {
          const [userData] = table;
          response = await request(app).post('/users').send(userData);
          expect(response.status).toBe(201);
          expect(response.body.message).toBe('Cadastro realizado com sucesso');
          userId = response.body.user.id;
      });
  
      and('eu seleciono a opção "Editar Perfil"', () => {});
  
      when('eu atualizo os campos:', async (table) => {
          const [userData] = table;
          response = await request(app).put(`/users/${userId}`).send(userData);
      });
  
      and('eu salvo as alterações', () => {});
  
      then('eu deveria ver a mensagem "Perfil atualizado com sucesso"', () => {
          expect(response.status).toBe(200);
          expect(response.body.message).toBe('Perfil atualizado com sucesso');
      });
  
      and('minha nova bio e exibida na página de perfil', async () => {
          const updatedProfile = await request(app).get(`/users/${userId}`);
          expect(updatedProfile.body.bio).toBe('Amante de livros e aventuras literárias');
      });
  });

  test('Cancelar alterações no perfil', ({ given, when, then, and }) => {
    let originalBio: string | undefined; // Armazenará a bio original para comparação
    let editedBio: string | undefined;

    given('eu estou na minha página de perfil logado:', async (table) => {
        const [userData] = table;
        const response = await request(app).post('/users').send(userData);
        expect(response.status).toBe(201);
        userId = userData.id;
        const profileResponse = await request(app).get(`/users/${userId}`);
        originalBio = profileResponse.body.bio;
    });

    and('eu seleciono a opção "Editar Perfil"', () => {});

    when('eu atualizo os campos:', async (table) => {
        const [userData] = table;
    });

    and('eu clico na opção "Cancelar"', async () => {});

    then('eu deveria ver a mensagem "Perfil não foi atualizado"', () => {});

    and('minha bio permanece a mesma na página de perfil', async () => {
        const updatedProfile = await request(app).get(`/users/${userId}`);
        expect(updatedProfile.body.bio).toBe(originalBio);
        expect(response.status).toBe(200);
    });
  });

});
