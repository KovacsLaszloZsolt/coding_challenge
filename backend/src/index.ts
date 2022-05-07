/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';
import Fastify, { FastifyInstance } from 'fastify';
import { foodRoutes } from './routes/foodRoutes';
import { loginRoute } from './routes/loginRoute';
import { registerRoute } from './routes/registerRoute';
import { connectDB } from './config/db';
import fastifyCors from 'fastify-cors';

//TODO: build your application here

const PORT = parseInt(process.env.PORT || '3001', 10);
export const app: FastifyInstance = Fastify({ logger: true });

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
});

connectDB();

app.register(foodRoutes);
app.register(loginRoute);
app.register(registerRoute);

app.setNotFoundHandler((_req, reply) => {
  reply.status(404).send({
    error: 'not found',
  });
});

app.setErrorHandler(async (error, _req, reply) => {
  console.log(error);
  if (error.validation) {
    const { missingProperty } = error.validation[0].params;
    return reply.status(400).send({ error: `${missingProperty} required` });
  }

  return reply.status(500).send({
    error: 'internal server error',
  });
});

const main = async (): Promise<void> => {
  //TODO: start your application here

  app.listen(PORT, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};

main().catch(console.error);
