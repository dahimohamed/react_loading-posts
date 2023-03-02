/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { getComments } from './api/comments'
import { getPosts } from './api/posts'
import { getUser } from './api/users'
import { type Comment } from './Types/comments'
import { type Post } from './Types/posts'
import { type User } from './Types/users'

interface ProviderProps {
  children: ReactNode
}

interface AppContextType {
  posts: Post[]
  postsWithCommentsUser: Post[]
  selectedPostId: number
  setPosts: (post: Post[]) => void
  addPost: (post: Post) => void
  selectPostId: (index: number) => void
}

export const AppContext = React.createContext<AppContextType>({
  posts: [],
  postsWithCommentsUser: [],
  selectedPostId: 0,
  setPosts: () => { },
  addPost: () => { },
  selectPostId: () => { }
})

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [selectedPostId, setSelectedPostId] = useState(0)

  const loadPosts = async () => {
    const loadedPosts = await getPosts(1)

    setPosts(loadedPosts)
  }

  const loadComments = async () => {
    const loadedComments = await getComments(1)

    setComments(loadedComments)
  }

  const loadUser = async () => {
    const loadedUser = await getUser(1)

    setUser(loadedUser)
  }

  useEffect(() => {
    loadPosts()
    loadComments()
    loadUser()
  }, [])

  const postsWithCommentsUser: Post[] = posts.map(post => ({
    ...post,
    comments,
    user
  }))

  const addPost = useCallback((newPost: Post) => {
    setPosts([...posts, newPost])
  }, [posts])

  const selectPostId = (index: number): void => { setSelectedPostId(index) }

  const context = useMemo(() => ({
    posts,
    postsWithCommentsUser,
    selectedPostId,
    setPosts,
    addPost,
    selectPostId
  }), [addPost, posts, postsWithCommentsUser, selectedPostId])

  return (
        <AppContext.Provider value={context} >
            {children}
        </AppContext.Provider>
  )
}
