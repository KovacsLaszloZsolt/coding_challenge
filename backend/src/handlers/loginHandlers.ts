import { LoginHandler, UserType } from '../interfaces';
import { User } from '../models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const loginHandler: LoginHandler = async (req, reply) => {
  const { username, password } = req.body as { username: string; password: string };
  console.log(process.env.ACCESS_TOKEN_SECRET);
  const user: UserType | null = await User.findOne({ username });

  if (user && (await bcryptjs.compare(password, user.password))) {
    const accessToken: string = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: '1h',
    });

    return reply.status(200).send({ token: accessToken });
  }

  return reply.status(401).send({ error: 'invalid login credential' });
};
