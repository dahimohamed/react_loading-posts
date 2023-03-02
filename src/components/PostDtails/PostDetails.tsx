/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useContext, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { FaArrowLeft } from 'react-icons/fa'

import { Link, useNavigate } from 'react-router-dom'
import '../PostInfo/PostInfo.scss'
import { removePost, updatePost } from '../../api/posts'

import { UserInfo } from '../UserInfo'
import { AppContext } from '../../AppContext'
import { CommentList } from '../CommentList'

export const PostDetails: React.FC = () => {
  const {
    postsWithCommentsUser,
    selectedPostId,
    posts,
    setPosts
  } = useContext(AppContext)

  const title = posts[selectedPostId - 1]?.title
  const body = posts[selectedPostId - 1]?.body

  const [postTitle, setTitle] = useState(title)
  const [postBody, setBody] = useState(body)
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const edditPost = async () => {
    const updatedPost = await updatePost(selectedPostId, postTitle, postBody)

    const updatedPosts = posts.map(item => {
      if (item.id === updatedPost.id) {
        return updatedPost
      }

      return item
    })

    setPosts(updatedPosts)
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const deletePost = async () => {
    const filteredTodos = posts.filter(({ id }) => id !== selectedPostId)

    try {
      await removePost(selectedPostId)

      setPosts(filteredTodos)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(postsWithCommentsUser)

  return (
        <>
            <Link
                to="/"
                className="
                    text-blue-500
                    hover:text-blue-700
                    font-bold"
            >
                <FaArrowLeft className="mr-2 inline-block" />

                <h1 className="inline-block"> Posts</h1>
            </Link>

            <div className="PostInfo">
                <div className="PostInfo__header">
                    <div className="flex ">
                        <button
                            type="button"
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                font-bold
                                py-2
                                px-4
                                mb-5
                                rounded
                                ml-auto"

                            onClick={() => {
                              navigate('/creatPost')
                            }}
                        >
                            + New Post
                        </button>
                    </div>
                    <form
                        onSubmit={(event) => {
                          event.preventDefault()
                          edditPost()
                          navigate('/')
                        }}
                    >
                        <textarea
                            cols={80}
                            rows={3}
                            className="mb-10 block"
                            placeholder="Post title"
                            value={postTitle}
                            onChange={(event) => {
                              setTitle(event.target.value)
                            }}
                        >

                        </textarea>

                        <textarea
                            className="mb-2 block"
                            cols={80}
                            rows={6}
                            placeholder="Post body"
                            value={postBody}
                            onChange={(event) => {
                              setBody(event.target.value)
                            }}
                        >

                        </textarea>
                        <br />

                        <p
                            className="mb-8"
                        >
                            {' Posted by  '}

                        <UserInfo user={postsWithCommentsUser[selectedPostId - 1]?.user} />

                        </p>

                        <button
                            type="button"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-10"
                            onClick={() => {
                              deletePost()
                              navigate('/')
                            }}
                        >
                            <AiOutlineDelete className="mr-2 inline-block" />
                            Delete
                        </button>

                        {' '}

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            <AiOutlineEdit className="mr-2 inline-block" />
                            Update
                        </button>
                    </form>

                </div>

                <hr />

                {postsWithCommentsUser[selectedPostId - 1]?.comments.length > 0
                  ? (
                        <CommentList comments={postsWithCommentsUser[selectedPostId - 1]?.comments} />
                    )
                  : (
                        <b>
                            No comments yet
                        </b>
                    )}
            </div>
        </>
  )
}
