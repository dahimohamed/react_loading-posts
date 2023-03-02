import React from 'react'
import { Link } from 'react-router-dom'

import './PostInfo.scss'
import { type Post } from '../../Types/posts'

interface Props {
  post: Post
  selectPostId: (index: number) => void
}

export const PostInfo: React.FC<Props> = ({ post, selectPostId }) => {
  const {
    id,
    title,
    body
  } = post

  return (
    <div className="PostInfo">
      <div className="PostInfo__header">
        <h3 className="PostInfo__title">{title}</h3>

      </div>

      <p className="PostInfo__body">
        {body}
      </p>

      <hr />

      <Link
        to="/post-details"
        className="
          text-blue-500
          hover:text-blue-700
          font-bold"
        onClick={() => {
          selectPostId(id)
        }}
      >
        Details
      </Link>
    </div>
  )
}
