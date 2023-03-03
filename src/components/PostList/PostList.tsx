import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { PostInfo } from '../PostInfo'

import './PostList.scss'

export const PostList: React.FC = () => {
  const { posts } = useContext(AppContext)

  return (
    <div className="Post">
      {posts.map(post => (
        <PostInfo
          key={post.id}
          post={post}
        />
      ))}
    </div>
  )
}
