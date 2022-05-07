import { FastifyPluginCallback } from 'fastify';
import { errorSchema } from '../interfaces';
import { registerHandler } from '../handlers/registerHandler';

const registerOpts = {
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
        properties: {
          username: { type: 'string' },
        },
      },
      409: errorSchema,
    },
  },
  handler: registerHandler,
};

export const registerRoute: FastifyPluginCallback = (app, options, done) => {
  app.post('/register', registerOpts);
  done();
};
