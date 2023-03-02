import { type Comment } from '../Types/comments'
import { client } from '../utils/fetchClient'

export const getComments = async (postId: number): Promise<Comment[]> => {
  return await client.get<Comment[]>(`/comments?postId=${postId}`)
}
