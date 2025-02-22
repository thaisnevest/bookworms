// eslint-disable-next-line import/no-extraneous-dependencies
import { loadFeature, defineFeature } from 'jest-cucumber';
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import { connection } from '../../src/Helper/database.config';
import app from '../../src/app';
import groupRepository from '../../src/repositories/groupRepository';

const feature = loadFeature('./tests/features/updateGroup.feature');

defineFeature(feature, (test) => {
  let response: supertest.Response;

  test('atualizar grupo', ({ given, when, then, and }) => {
    given(
      /^Existe no sistema um grupo com "id": "([^"]+)", "nome": "([^"]+)"$/,
      async (id, nome) => {
        await groupRepository.create({
          id,
          code: 'tantofaz1',
          name: nome,
          active: true,
          image: '',
          type: 'CHECKIN',
          duration: '2028-12-31T00:00:00.000Z',
          createdAt: new Date(),
        });
      },
    );

    when(
      /^uma requisição PUT é feita para "([^"]+)" com body "name": "([^"]+)"$/,
      async (route, nome) => {
        const body = { groupName: nome };
        response = await supertest(app).put(route).send(body);
      },
    );

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

    and(
      /^não existe no sistema um grupo com "id": "([^"]+)", "nome": "([^"]+)"$/,
      async (id, nome) => {
        const group = await (
          await connection.get()
        ).groups.findUnique({ where: { id } });
        if (!group) {
          throw new Error('group doesnt exist');
        } else if (group.name === nome) {
          throw new Error('name stayed the same');
        }
      },
    );

    and(
      /^existe no sistema um grupo com "id": "([^"]+)", "nome": "([^"]+)"$/,
      async (id, nome) => {
        const group = await (
          await connection.get()
        ).groups.findUnique({ where: { id } });
        await connection.clear();
        await connection.close();
        if (!group) {
          throw new Error('group doesnt exist');
        } else if (group.name !== nome) {
          throw new Error('name didnt match the change');
        }
      },
    );
  });
});
