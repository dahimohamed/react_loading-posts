/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../PostInfo/PostInfo.scss'
import { createPost } from '../../api/posts'
import { AppContext } from '../../AppContext'
import { FaArrowLeft } from 'react-icons/fa'

export const CreatingPost: React.FC = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const navigate = useNavigate()

  const { addPost } = useContext(AppContext)

  const addNewPost = async (): Promise<void> => {
    const newPost = await createPost(
      title,
      1,
      body
    )

    addPost(newPost)
  }

  return (
    <div className="PostInfo__header">
    <Link
        to="/"
        className="
            text-blue-500
            hover:text-blue-700
            font-bold
            block
            mb-10"
    >
        <FaArrowLeft className="mr-2 inline-block" />

        <h1 className="inline-block"> Posts</h1>
    </Link>

    <form
        onSubmit={(event) => {
          event.preventDefault()
          addNewPost()
          navigate('/')
        }}
    >

        <div className="mb-4 mr-10 ml-5">
            <label className="
                block
                text-gray-700
                font-bold mb-2"
                htmlFor="postTitle"
            >
                Post Title
            </label>

            <input
                className="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-full
                    py-2
                    px-3
                    text-gray-700
                    leading-tight
                    focus:outline-none
                    focus:shadow-outline"

                id="postTitle"
                type="text"
                required
                placeholder="Enter post title here"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value)
                }}
            />
        </div>

        <div className="mb-4 mr-10 ml-5">
            <label className="
                block
                text-gray-700
                font-bold
                mb-2"
                htmlFor="postBody"
            >
                Post Body
            </label>
            <textarea
                className="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-full
                    py-2
                    px-3
                    text-gray-700
                    leading-tight
                    focus:outline-none f
                    ocus:shadow-outline"
                id="postBody"
                rows={6}
                required
                placeholder="Enter post body here"
                value={body}
                onChange={(event) => {
                  setBody(event.target.value)
                }}
            ></textarea>
        </div>

        <br />
        <button
            type="submit"
            className="
                bg-blue-500 h
                over:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                focus:outline-none
                focus:shadow-outline
                ml-40"
        >
            Save Post
        </button>
    </form>

    </div>
  )
}
