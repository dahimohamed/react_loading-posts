import { type User } from '../Types/users'
import { client } from '../utils/fetchClient'

export const getUser = async (userId: number): Promise<User> => {
  return await client.get<User>(`/users/${userId}`)
}
