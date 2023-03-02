import { type Post } from '../Types/posts'
import { client } from '../utils/fetchClient'

export const getPosts = async (userId: number): Promise<Post[]> => {
  return await client.get<Post[]>(`/posts?userId=${userId}`)
}

export const createPost = async (
  title: string,
  userId: number,
  body: string
): Promise<Post> => {
  return await client.post<Post>('/posts', {
    userId,
    title,
    body
  })
}

export const removePost = async (postId: number): Promise<unknown> => {
  return await client.delete(`/posts/${postId}`)
}

export const updatePost = async (
  id: number,
  title: string,
  body: string
): Promise<Post> => {
  return await client.patch<Post>(`/posts/${id}`, { title, body })
}
