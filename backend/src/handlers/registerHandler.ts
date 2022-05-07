import { RegisterHeandler, UserType } from '../interfaces';
import { User } from '../models/userModel';
import { randomUUID } from 'crypto';
import bcryptjs from 'bcryptjs';

export const registerHandler: RegisterHeandler = async (req, reply) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  const userExist: UserType | null = await User.findOne({ username });

  if (userExist) {
    return reply.status(409).send({ error: 'user already exist' });
  }

  const salt = bcryptjs.genSaltSync(10);
  const hash = await bcryptjs.hash(password, salt);

  await User.create({
    _id: randomUUID(),
    username: username,
    password: hash,
  });

  return {
    username: username,
  };
};
