import React from 'react'
import './CommentList.scss'
import { type Comment } from '../../Types/comments'
import { CommentInfo } from '../CommentInfo'

interface Props {
  comments: Comment[]
}

export const CommentList: React.FC<Props> = ({ comments }) => (
  <div className="CommentList">
    <h1 className="bg-blue-200">Comments</h1>
    {comments.map(comment => (
      <CommentInfo key={comment.id} comment={comment} />
    ))}
  </div>
)
