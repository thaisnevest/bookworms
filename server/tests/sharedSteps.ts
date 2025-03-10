import supertest from "supertest";
import { DefineStepFunction } from 'jest-cucumber';
import { Comment, Post } from '@prisma/client';
import app from '../src/app';

export const request = supertest(app);
export interface shared_res {
  response?: supertest.Response;
}

export const test_user1 = {
  id: '1111',
  username: 'Juninho24',
  groupId: 'null',

};

export const test_group1 = {
  id: '1234',
};




