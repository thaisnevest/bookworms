// eslint-disable-next-line import/no-extraneous-dependencies
import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import { TypeScore } from '@prisma/client';
import { connection } from '../../src/database/database.config';
import app from '../../src/app';
import { GroupRepository } from '../../src/repositories';

const feature = loadFeature('./tests/features/score.feature');

const createGroup = async (id: string) => ({
  id,
  code: 'group-code',
  name: 'Grupo 1',
  image: 'image',
  createdAt: new Date(),
  active: true,
  duration: new Date(),
  type: TypeScore.CHECKIN, // or TypeScore.PAGES based on your requirement
});

const createUser = async (
  id: string,
  username: string,
  groupId: string,
  score: number,
) => ({
  id,
  name: 'Test Name',
  username,
  email: `${username}@gmail.com`,
  password: '12345678',
  groupId,
  score,
});

const createPostinGroupCheckin = async (
  id: string,
  groupId: string,
  userId: string,
) => ({
  id,
  title: 'Post Title',
  image: '',
  createdAt: new Date(),
  numPages: 10,
  groupId,
  authorId: userId,
});

defineFeature(feature, (test) => {
  let response: supertest.Response;

  beforeAll(async () => {
    await connection.create();
  });
  afterEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  const givenGroup = async (given: DefineStepFunction) => {
    given(/^há um grupo no sistema com id "(.*)"$/, async (groupId) => {
      const group = await createGroup(groupId);
      await GroupRepository.create({
        id: group.id,
        code: group.code,
        name: group.name,
        image: group.image,
        createdAt: group.createdAt,
        active: group.active,
        duration: group.duration,
        type: group.type,
      });
    });
  };

  const givenNoGroup = async (given: DefineStepFunction) => {
    given(/^não há um grupo no sistema com id "(.*)"$/, async (groupId) => {
      const group = await (
        await connection.get()
      ).groups.findUnique({ where: { id: groupId } });
      if (group) {
        await (
          await connection.get()
        ).groups.delete({ where: { id: groupId } });
      }
    });
  };

  const givenUserinGroupwithScore = async (given: DefineStepFunction) => {
    given(
      /^há um usuário no sistema com id "(.*)", username "(.*)", groupId "(.*)" e score "(.*)"$/,
      async (userId, username, groupId, score) => {
        // format and create user
        const user = await createUser(userId, username, groupId, Number(score));
        await connection.get();
        await (await connection.get()).user.create({ data: user });
        // console.log('User created successfully');
      },
    );
  };

  const givenPost = async (given: DefineStepFunction) => {
    given(
      /^há um post no sistema com id "(.*)", groupId "(.*)" e userId "(.*)" criado no dia atual$/,
      async (postId, groupId, userId) => {
        // format and create post
        const post = await createPostinGroupCheckin(postId, groupId, userId);
        await connection.get();
        await (await connection.get()).post.create({ data: post });
        // console.log('Post created successfully');
      },
    );
  };

  const givenPostwithPages = async (given: DefineStepFunction) => {
    given(
      /^há um post no sistema com id "(.*)", groupId "(.*)", userId "(.*)" e numPages "(.*)" criado no dia atual$/,
      async (postId, groupId, userId, numPages) => {
        // format and create post
        const post = await createPostinGroupCheckin(postId, groupId, userId);
        post.numPages = Number(numPages);
        await connection.get();
        await (await connection.get()).post.create({ data: post });
        // console.log('Post created successfully');
      },
    );
  };

  const whenGETRanking = async (when: DefineStepFunction) => {
    when(
      /^é feita uma busca do ranking do group de id "(.*)"$/,
      async (groupId) => {
        response = await supertest(app).get(`/score/ranking/${groupId}`);
      },
    );
  };

  // const whenPUTRequest = async (when: DefineStepFunction) => {
  //   when(/^uma requisição PUT for enviada para "(.*)"$/, async (route) => {
  //     response = await supertest(app).put(route);
  //   });
  // };

  const whenPOSTPost = async (when: DefineStepFunction) => {
    when(
      /^é criado um post no sistema com id "(.*)", groupId "(.*)" e userId "(.*)"$/,
      async (postId, groupId, userId) => {
        // format and create post
        const post = await createPostinGroupCheckin(postId, groupId, userId);
        await connection.get();
        await (await connection.get()).post.create({ data: post });
        // update score
        response = await supertest(app).put(
          `/score/createPost/${groupId}/${userId}/${postId}`,
        );
      },
    );
  };

  const whenPUTPost = async (when: DefineStepFunction) => {
    when(
      /^é atualizado o número de páginas de um post no sistema com id "(.*)", groupId "(.*)", userId "(.*)" de numPages "(.*)" para numPages "(.*)"$/,
      async (postId, groupId, userId, currentNumPages, newNumPages) => {
        // format and create post
        await connection.get();
        await (
          await connection.get()
        ).post.update({
          where: { id: postId },
          data: { numPages: Number(newNumPages) },
        });
        // update score
        response = await supertest(app)
          .put(`/score/putPost/${groupId}/${userId}/${postId}`)
          .send({
            currentNumPages,
            newNumPages,
          });
      },
    );
  };

  const thenStatusResponse = async (then: DefineStepFunction) => {
    then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
      expect(response.status).toBe(Number(status));
    });
  };

  const thenMessageResponse = async (then: DefineStepFunction) => {
    then(/^a resposta deve conter a mensagem "(.*)"$/, async (message) => {
      expect(response.body.message).toBe(message);
    });
  };

  const thenResponseArray = async (then: DefineStepFunction) => {
    then(/^deve ser retornado um JSON com uma lista de usuários$/, async () => {
      expect(response.body.data).toBeInstanceOf(Array);
    });
  };

  const thenUserinPosition = async (then: DefineStepFunction) => {
    then(
      /^o usuário com id "(.*)" deve ser o elemento "(.*)" da lista$/,
      async (userId, position) => {
        expect(response.body.data[Number(position)].id).toBe(userId);
      },
    );
  };

  const thenUserwithScore = async (then: DefineStepFunction) => {
    then(
      /^deve ser retornado um JSON contendo o usuário com id "(.*)", groupId "(.*)" e score "(.*)"$/,
      async (userId, groupId, score) => {
        expect(response.body.data.id).toBe(userId);
        expect(response.body.data.groupId).toBe(groupId);
        expect(response.body.data.score).toBe(Number(score));
      },
    );
  };

  test('Consultar ranking de um grupo', ({ given, and, when, then }) => {
    givenGroup(given);
    givenUserinGroupwithScore(and);
    givenUserinGroupwithScore(and);
    givenUserinGroupwithScore(and);
    whenGETRanking(when);
    thenStatusResponse(then);
    thenResponseArray(and);
    thenUserinPosition(and);
    thenUserinPosition(and);
    thenUserinPosition(and);
  });

  test('Consultar ranking de um grupo que não existe', ({
    given,
    when,
    then,
    and,
  }) => {
    givenNoGroup(given);
    whenGETRanking(when);
    thenStatusResponse(then);
    thenMessageResponse(and);
  });

  test('Incrementar a pontuação de um usuário depois de criar um post em grupo por check-in', ({
    given,
    and,
    when,
    then,
  }) => {
    givenGroup(given);
    givenUserinGroupwithScore(and);
    whenPOSTPost(when);
    thenStatusResponse(then);
    thenUserwithScore(and);
    thenMessageResponse(and);
  });

  test('Inalterar a pontuação de um usuário depois de criar um post em grupo por check-in', ({
    given,
    and,
    when,
    then,
  }) => {
    givenGroup(given);
    givenUserinGroupwithScore(and);
    givenPost(and);
    whenPOSTPost(when);
    thenStatusResponse(then);
    thenUserwithScore(and);
    thenMessageResponse(and);
  });

  test('Inalterar a pontuação de um usuário depois de atualizar um post em grupo por check-in', ({
    given,
    and,
    when,
    then,
  }) => {
    givenGroup(given);
    givenUserinGroupwithScore(and);
    givenPostwithPages(and);
    whenPUTPost(when);
    thenStatusResponse(then);
    thenUserwithScore(and);
    thenMessageResponse(and);
  });
});
