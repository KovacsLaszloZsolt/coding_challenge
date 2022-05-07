import { FastifyRequest, FastifyReply, FastifyPluginCallback } from 'fastify';
import { FoodRouteOpts, errorSchema } from '../interfaces';
import { getAllFoods, getSingleFood, addNewFood, updateFood, deleteFood } from '../handlers/foodHandlers';
import jwt from 'jsonwebtoken';

const foodSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string' },
    details: {
      type: 'object',
      patternProperties: {
        '^.*$': {
          type: 'object',
          properties: {
            unit: { type: 'string' },
            amount: { type: 'number' },
          },
        },
      },
    },
    _id: { type: 'string' },
    createdAt: { type: 'string' },
  },
};

const getAllFoodsOpts: FoodRouteOpts = {
  preValidation: authorization,
  schema: {
    response: {
      200: {
        type: 'array',
        items: foodSchema,
      },
    },
  },
  handler: getAllFoods,
};

const getSingleFoodOpts: FoodRouteOpts = {
  preValidation: authorization,
  schema: {
    response: {
      200: foodSchema,
      404: errorSchema,
    },
  },
  handler: getSingleFood,
};

const addNewFoodOpts: FoodRouteOpts = {
  preValidation: authorization,
  schema: {
    body: foodSchema,
    response: {
      201: foodSchema,
    },
  },
  handler: addNewFood,
};

const updateFoodOpts: FoodRouteOpts = {
  preValidation: authorization,
  schema: {
    body: foodSchema,
    response: {
      200: foodSchema,
      404: errorSchema,
    },
  },
  handler: updateFood,
};

const deleteFoodOpts: FoodRouteOpts = {
  preValidation: authorization,
  schema: {
    response: {
      204: {},
    },
  },
  handler: deleteFood,
};

async function authorization(req: FastifyRequest, reply: FastifyReply): Promise<void | FastifyReply> {
  try {
    const authToken = req.headers.authorization?.split(' ')[1] as string;
    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET as string);
  } catch (error) {
    return reply.header('Access-Control-Allow-Origin', '*').status(401).send({
      error: 'invalid login credential',
    });
  }
}

export const foodRoutes: FastifyPluginCallback = (app, _options, done) => {
  app.get('/food', getAllFoodsOpts);

  app.get('/food/:id', getSingleFoodOpts);

  app.post('/food', addNewFoodOpts);

  app.put('/food/:id', updateFoodOpts);

  app.delete('/food/:id', deleteFoodOpts);
  done();
};
