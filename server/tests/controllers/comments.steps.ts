// eslint-disable-next-line import/no-extraneous-dependencies
import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import { connection } from '../../src/database/database.config';
import app from '../../src/app';
import { TypeScore } from '@prisma/client';

const feature = loadFeature('./tests/features/comments.feature');

const createGroup = async (id: string) => ({
  id,
  code: 'group-code',
  name: 'Grupo 1',
  image: 'image-url',
  createdAt: new Date(),
  active: true,
  duration: new Date(),
  type: TypeScore.CHECKIN,
});

const createComment = async (
  postId: string,
  authorId: string,
  date: string,
  text: string,
) => ({
  postId,
  authorId,
  createdAt: new Date(date),
  text,
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
      const prisma = await connection.get();

      const group = await createGroup(groupId);

      await prisma.groups.create({
        data: {
          id: group.id,
          code: group.code,
          name: group.name,
          image: group.image,
          createdAt: group.createdAt,
          active: group.active,
          duration: group.duration,
          type: group.type,
        },
      });
    });
  };

  const givenUser = async (given: DefineStepFunction) => {
    given(
      /^há um usuário no sistema com id "(.*)", username "(.*)" e groupId "(.*)"$/,
      async (userId, username, groupId) => {
        const user = {
          id: userId,
          username,
          groupId,
          name: 'gio',
          email: 'gio@example.com',
          password: '123456',
        };
        await connection.get();
        await (await connection.get()).user.create({ data: user });
      },
    );
  };

  const givenPost = async (given: DefineStepFunction) => {
    given(
      /^há um post no sistema com id "(.*)", groupId "(.*)" e userId "(.*)"$/,
      async (postId, groupId, userId) => {
        const post = await createPostinGroupCheckin(postId, groupId, userId);
        await connection.get();
        await (await connection.get()).post.create({ data: post });
      },
    );
  };

  const givenComment = async (given: DefineStepFunction) => {
    given(
      /^há um comentário no sistema com id "(.*)", postId "(.*)", authorId "(.*)", date "(.*)" e texto "(.*)"$/,
      async (commentId, postId, authorId, createdAt, text) => {
        const commentData = await createComment(
          postId,
          authorId,
          createdAt,
          text,
        );
        const prisma = await connection.get();
        await prisma.comment.create({
          data: {
            id: commentId,
            ...commentData,
          },
        });
      },
    );
  };

  const whenPOSTRequest = async (when: DefineStepFunction) => {
    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo:$/,
      async (route, requestBody) => {
        response = await supertest(app)
          .post(route)
          .send(JSON.parse(requestBody));
      },
    );
  };

  const whenPUTRequest = async (when: DefineStepFunction) => {
    when(
      /^uma requisição PUT for enviada para "(.*)" com o corpo da requisição sendo:$/,
      async (route, requestBody) => {
        response = await supertest(app)
          .put(route)
          .send(JSON.parse(requestBody));
      },
    );
  };

  const whenDELETERequest = async (when: DefineStepFunction) => {
    when(/^uma requisição DELETE for enviada para "(.*)"$/, async (route) => {
      response = await supertest(app).delete(route);
    });
  };

  const thenStatusResponse = async (then: DefineStepFunction) => {
    then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
      if (response.status !== parseInt(status, 10)) {
        throw new Error(
          `Expected status ${status}, but got ${response.status}`,
        );
      }
    });
  };

  const thenMessageResponse = async (then: DefineStepFunction) => {
    then(/^a resposta deve conter a mensagem "(.*)"$/, async (message) => {
      if (response.body.message !== message) {
        throw new Error(
          `Expected message ${message}, but got ${response.body.message}`,
        );
      }
    });
  };

  const thenCommentCreated = async (then: DefineStepFunction) => {
    then(
      /^há no sistema um comentário criado com:$/,
      async (expectedComment) => {
        const prisma = await connection.get();
        const parsedComment = JSON.parse(expectedComment);
        const comment = await prisma.comment.findFirst({
          where: {
            postId: parsedComment.postId,
            authorId: parsedComment.authorId,
          },
        });

        if (!comment) {
          throw new Error('Comentário não criado');
        }
        console.log('Comentário encontrado:', comment);
        console.log('Comentário esperado:', parsedComment);
        if (
          comment.postId !== parsedComment.postId ||
          comment.authorId !== parsedComment.authorId ||
          comment.text !== parsedComment.text ||
          comment.createdAt.toISOString() !==
            new Date(parsedComment.createdAt).toISOString()
        ) {
          throw new Error('Os dados do comentário não correspondem');
        }
        console.log('Comentário encontrado:', comment);
        console.log('Comentário esperado:', parsedComment);
      },
    );
  };

  test('criar comentário', ({ given, when, then }) => {
    givenGroup(given);
    givenUser(given);
    givenPost(given);
    whenPOSTRequest(when);
    thenStatusResponse(then);
    thenMessageResponse(then);
  });

  test('editar comentário', ({ given, when, then }) => {
    givenGroup(given);
    givenUser(given);
    givenPost(given);
    givenComment(given);
    whenPUTRequest(when);
    thenStatusResponse(then);
    thenMessageResponse(then);
  });

  test('deletar comentário', ({ given, when, then }) => {
    givenGroup(given);
    givenUser(given);
    givenPost(given);
    givenComment(given);
    whenDELETERequest(when);
    thenStatusResponse(then);
    thenMessageResponse(then);
  });

  test('não criar comentário com mais de 150 caracteres', ({
    given,
    when,
    then,
  }) => {
    givenGroup(given);
    givenUser(given);
    givenPost(given);
    whenPOSTRequest(when);
    thenStatusResponse(then);
    thenMessageResponse(then);
  });
});
