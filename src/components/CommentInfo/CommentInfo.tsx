import React from 'react'
import { type Comment } from '../../Types/comments'

interface Props {
  comment: Comment
}

export const CommentInfo: React.FC<Props> = ({ comment }) => {
  const { name, email, body } = comment

  return (
    <div className="CommentInfo">
      <div className="CommentInfo__title">
        <strong className="CommentInfo__name">
          {name}
        </strong>

        {' by '}

        <a
          className="
            text-blue-500
            hover:text-blue-700
            font-bold"
          href={`mailto:${email}`}
        >
          {email}
        </a>
      </div>

      <div className="CommentInfo__body">
        {body}
      </div>
    </div>
  )
}
