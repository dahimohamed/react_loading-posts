import React from 'react';
import { Link } from 'react-router-dom';

import './PostInfo.scss';
import { Post } from '../../Types/posts';

import { CommentList } from '../CommentList';
import { UserInfo } from '../UserInfo';

interface Props {
  post: Post,
  selectPostId: (index: number) => void,
}

export const PostInfo: React.FC<Props> = ({ post, selectPostId }) => {
  const {
    id,
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <div className="PostInfo">
      <div className="PostInfo__header">
        <h3 className="PostInfo__title">{title}</h3>

        {user && (
          <p>
            {' Posted by  '}

            <UserInfo user={user} />
          </p>
        )}
      </div>

      <p className="PostInfo__body">
        {body}
      </p>

      <hr />

      {comments && comments.length && (
          <CommentList comments={comments} />
        )
      }
      
      <Link
        to="/post-details"
        onClick={() => {

          selectPostId(id);
        }}
      >
        Details
      </Link>
    </div>
  );
};
