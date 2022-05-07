import { FastifyPluginCallback } from 'fastify';
import { errorSchema } from '../interfaces';
import { loginHandler } from '../handlers/loginHandlers';

const loginOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        required: ['token'],
        properties: {
          token: { type: 'string' },
        },
      },
      401: errorSchema,
    },
  },
  handler: loginHandler,
};

export const loginRoute: FastifyPluginCallback = (app, options, done) => {
  app.post('/login', loginOpts);
  done();
};
