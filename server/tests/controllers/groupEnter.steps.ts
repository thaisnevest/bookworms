// eslint-disable-next-line import/no-extraneous-dependencies
import { loadFeature, defineFeature } from 'jest-cucumber';
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import { connection } from '../../src/database/database.config';
import app from '../../src/app';
import groupRepository from '../../src/repositories/groupRepository';

const feature = loadFeature('./tests/features/createGroup.feature');

defineFeature(feature, (test) => {
  let response: supertest.Response;

  test('deletar grupo', ({ given, when, then, and }) => {
    given(/^Existe no sistema um grupo com "id": "([^"]+)"$/, async (id) => {
      await groupRepository.create({
        id,
        code: 'tantofaz1',
        name: 'tantofaz2',
        active: true,
        image: '',
        type: 'CHECKIN',
        duration: '2028-12-31T00:00:00.000Z',
        createdAt: new Date(),
      });
    });

    when(/^uma requisição DELETE é feita para "([^"]+)"$/, async (route) => {
      response = await supertest(app).delete(route);
    });

    then(/^o status da resposta deve ser "([^"]+)"$/, (status) => {
      if (response.status !== parseInt(status, 10)) {
        throw new Error(
          `Expected status ${status}, but got ${response.status}`,
        );
      }
    });

    and(/^o sistema devolve a resposta "(.+)"$/, (message) => {
      if (response.body.message !== message) {
        throw new Error(
          `Expected message "${message}", but got "${response.body.message}"`,
        );
      }
    });

    and(/^não existe no sistema um grupo com "id": "([^"]+)"$/, async (id) => {
      const group = await (
        await connection.get()
      ).groups.findUnique({ where: { id } });
      await connection.clear();
      await connection.close();
      if (group) {
        throw new Error(`group exists`);
      }
    });
  });
});
