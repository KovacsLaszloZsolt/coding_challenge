import { FoodEntry, FoodEntryDetails, FoodHandler } from '../interfaces';
import { randomUUID } from 'crypto';
import { Food } from '../models/foodModel';

export const getAllFoods: FoodHandler = async (_req, reply) => {
  return reply.status(200).send(await Food.find());
};

export const getSingleFood: FoodHandler = async (req, reply) => {
  const { id } = req.params as { id: string };

  const reqFood: FoodEntry | null = await Food.findById(id);

  if (!reqFood) {
    return reply.status(404).send({ error: 'food not found' });
  }

  return reply.status(200).send(reqFood);
};

export const addNewFood: FoodHandler = async (req, reply) => {
  const { name, details } = req.body as { name: string; details: FoodEntryDetails };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  return reply.status(201).send(await Food.create({ name: name, details: details, _id: randomUUID() }));
};

export const updateFood: FoodHandler = async (req, reply) => {
  const { id } = req.params as { id: string };
  const { name, details } = req.body as { name: string; details: FoodEntryDetails };

  const reqFood: FoodEntry | null = await Food.findByIdAndUpdate(
    id,
    {
      name: name,
      details: details,
    },
    { returnDocument: 'after' },
  );

  if (!reqFood) {
    return reply.status(404).send({ error: 'food not found' });
  }

  return reply.status(200).send(reqFood);
};

export const deleteFood: FoodHandler = async (req, reply) => {
  const { id } = req.params as { id: string };

  await Food.findByIdAndDelete(id);

  return reply.status(204).send();
};
