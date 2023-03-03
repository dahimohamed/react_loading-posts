import React from 'react'
import { Link } from 'react-router-dom'

import './PostInfo.scss'
import { type Post } from '../../Types/posts'

interface Props {
  post: Post
}

export const PostInfo: React.FC<Props> = ({ post }) => {
  const {
    id,
    title,
    body
  } = post

  return (
    <div className="Post__card">
      <div className="PostInfo__header">
        <h3 className="PostInfo__title block">{title}</h3>
      </div>

      <br />

      <p className="PostInfo__body">
        {body}
      </p>

      <br />

      <Link
        to={`/post-details/${id}`}
        className="
          text-blue-500
          hover:text-blue-700
          font-bold"
      >
        Details
      </Link>
    </div>
  )
}
