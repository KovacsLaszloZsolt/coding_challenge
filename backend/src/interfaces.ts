import { FastifyRequest, FastifyReply, RouteShorthandOptions } from 'fastify';

export type FoodEntryDetails = Record<string, { unit: string; amount: number }>;
export type FoodEntryCreateOptions = {
  name: string;
  details?: FoodEntryDetails;
};
export type FoodEntry = FoodEntryCreateOptions & { id: string; createdAt: Date };
export type FoodEntryUpdateOptions = Partial<FoodEntryCreateOptions>;

export type HandlerError = { error: string };
export type FoodHandler = {
  (req: FastifyRequest, reply: FastifyReply): Promise<FoodEntry[] | FoodEntry | HandlerError | void>;
};

export type FoodRouteOpts = RouteShorthandOptions & { handler: FoodHandler };

export type AccessToken = {
  token: string;
};
export type LoginHandler = {
  (req: FastifyRequest, reply: FastifyReply): Promise<AccessToken | HandlerError>;
};

export type LoginRouteOpts = RouteShorthandOptions & { handler: LoginHandler };

export type RegisterHeandler = {
  (req: FastifyRequest, reply: FastifyReply): Promise<any>;
};

export type UserType = {
  username: string;
  password: string;
  _id: string;
};

export const errorSchema = {
  error: { type: 'string' },
};
