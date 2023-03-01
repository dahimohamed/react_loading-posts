import { Post } from '../Types/posts';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const createPost = (
  title: string,
  userId: number,
  body: string,
) => {
  return client.post<Post>('/posts', {
    userId,
    title,
    body,
  });
};

export const removePost = (postId: number) => {
  return client.delete(`/posts/${postId}`);
};

export const updatePost = (
  id: number,
  title: string,
  body: string,
) => {
  return client.patch<Post>(`/posts/${id}`, { title, body });
};
