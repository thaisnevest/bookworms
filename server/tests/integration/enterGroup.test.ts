import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { connection } from '../Helper/database.config'
import app from '../../src/app';
import  groupRepository  from '../../src/repositories/groupRepository';

const feature = loadFeature('../features/enterGroup.feature');

defineFeature(feature, (test) => {
  let response;

  test('entrar em grupo', ({ given, when, then, and }) => {
    given(/^Há no sistema um grupo com "groupId": "([^"]+)" e "groupCode": "([^"]+)"$/, async (groupId, groupCode) => {
      const group = await groupRepository.create({
        id: groupId,
        code: groupCode,
        name: `Test Group ${groupId}`,
        active: true,
        image: '',
        type: 'CHECKIN',
        duration: '2028-12-31T00:00:00.000Z',
        createdAt: new Date()
      });
    });

    and(/^Há no sistema um usuário com "username": "([^"]+)", "groupId": "([^"]+)", "id": "([^"]+)"$/, async (username, groupId, id) => {

      const userData = {
        username: username,
        groupId: groupId === "null" ? null : groupId,
        id: id,
        name: username,
        email: 'tantofaz2',
        password: '123123',
      };

      try {
        await connection.get();
        await (await connection.get()).user.create({ data: userData });

      } catch (error) {
        throw new Error('erro criando user');
      }
    });

    when(/^uma requisição PUT é feita para "([^"]+)"$/, async (route) => {
      response = await supertest(app).put(route);
    });

    then(/^o status da resposta deve ser "([^"]+)"$/, (status) => {
      if (response.status !== parseInt(status)) {
        throw new Error(`Expected status ${status}, but got ${response.status}`);
      }
    });

    and(/^o sistema devolve a resposta "(.+)"$/, (message) => {
      if (response.body.message !== message) {
        throw new Error(`Expected message "${message}", but got "${response.body.message}"`);
      }
    });

    and(/^Há no sistema um usuário com "username": "([^"]+)", "groupId": "([^"]+)", "id": "([^"]+)"$/, async (username, groupId, id) => {
      const user = await (await connection.get()).user.findUnique({ where: { id: id } });
      await connection.clear();
      await connection.close();
      if (user) {
        if (user.groupId !== groupId) {
          throw new Error(`User groupId mismatch. Expected ${groupId}, got ${user.groupId}`);
        }
      } else {
        throw new Error(`User with id ${id} not found`);
      } 
    });
  });
});
