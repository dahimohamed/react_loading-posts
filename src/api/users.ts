import { User } from '../Types/users';
import { client } from '../utils/fetchClient';

export const getUser = (userId: number) => {
  return client.get<User>(`/users/${userId}`);
};
