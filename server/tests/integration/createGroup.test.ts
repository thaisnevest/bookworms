import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { connection } from '../Helper/database.config'
import app from '../../src/app';
import  groupRepository  from '../../src/repositories/groupRepository';

const feature = loadFeature('../features/createGroup.feature');

defineFeature(feature, (test) => {
  let response;

  test('deletar grupo', ({ given, when, then, and }) => {
    given(/^Existe no sistema um grupo com "id": "([^"]+)"$/, async (id) => {
      const group = await groupRepository.create({
        id: id,
        code: 'tantofaz1',
        name: 'tantofaz2',
        active: true,
        image: '',
        type: 'CHECKIN',
        duration: '2028-12-31T00:00:00.000Z',
        createdAt: new Date()
      });
    });

    when(/^uma requisição DELETE é feita para "([^"]+)"$/, async (route) => {
      response = await supertest(app).delete(route);
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

    and(/^não existe no sistema um grupo com "id": "([^"]+)"$/, async (id) => {
      const group = await (await connection.get()).groups.findUnique({ where: { id: id } });
      await connection.clear();
      await connection.close();
      if (group) {
        throw new Error(`group exists`);
      } 
    });
  });
});
