import React from 'react';

import { Post } from '../../Types/posts';


import { PostInfo } from '../PostInfo';

interface Posts {
  posts: Post[],
  selectPostId: (index: number) => void,

}

export const PostList: React.FC<Posts> = ({
  posts,
  selectPostId,
}) => {
  

  return (
    <div className="PostList">
      {posts.map(post => (
        <PostInfo
          key={post.id}
          post={post}
          selectPostId={selectPostId}
        />
      ))}
    </div>
  );
};
