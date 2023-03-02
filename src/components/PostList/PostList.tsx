import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'

import { PostInfo } from '../PostInfo'

export const PostList: React.FC = () => {
  const { posts, selectPostId } = useContext(AppContext)

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
  )
}
