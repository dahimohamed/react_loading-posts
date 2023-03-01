import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';


import './App.scss';

import { getComments } from './api/comments';
import { getUser } from './api/users';
import { User } from './Types/users';

import { Comment } from './Types/comments';
import { PostList } from './components/PostList';
import { getPosts } from './api/posts';
import { Post } from './Types/posts';

import { PostDetails } from './components/PostDtails/PostDetails';
import { CreatingPost } from './components/CreatingPost/CreatingPost';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const loadPosts = async () => {
    const loadedPosts = await getPosts(1);

    setPosts(loadedPosts);
  };

  const loadComments = async () => {
    const loadedComments = await getComments(1);

    setComments(loadedComments);
  };

  const loadUser = async () => {
    const loadedUser = await getUser(1);

    setUser(loadedUser as User);
  };



  useEffect(() => {
    loadPosts();
    loadComments();
    loadUser()
  }, []);

  const postsWithCommentsUser: Post[] = posts.map(post => ({
    ...post,
    comments,
    user,
  }));

  const addPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };

  const selectPostId = (index: number) => (
    setSelectedPostId(index)
  );

  return (
    <section className="App">
      <h1 className="App__title">list of posts (User 1)</h1>

      <Routes>
        <Route
          path='/'
          element={
            <PostList
              posts={posts}
              selectPostId={selectPostId}
            />
          }
        />

        <Route
          path='/creatPost'
          element={
            <CreatingPost
              addPost={addPost}
            />
          }
        />

        <Route
          path='/post-details'
          element={
            <PostDetails
              postsWithCommentsUser={postsWithCommentsUser}
              selectedPostId={selectedPostId}
              setPosts={setPosts}
              posts={posts}
            />
          }
        />

        <Route
          path='*'
          element={<h1>Page not found</h1>}
        />
      </Routes>
    </section>
  );
};
