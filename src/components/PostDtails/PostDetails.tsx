import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../PostInfo/PostInfo.scss';
import { removePost, updatePost } from '../../api/posts';
import { Post } from '../../Types/posts';

import { CommentList } from "../CommentList";
import { UserInfo } from "../UserInfo";

interface Props {
    postsWithCommentsUser: Post[],
    posts: Post[],
    selectedPostId: number,
    setPosts: (post: Post[]) => void,
}

export const PostDetails: React.FC<Props> = ({
    postsWithCommentsUser,
    selectedPostId,
    posts,
    setPosts,
}) => {
    const [title, setTitle] = useState(postsWithCommentsUser[selectedPostId - 1].title);
    const [body, setBody] = useState(postsWithCommentsUser[selectedPostId - 1].body);
    const navigate = useNavigate();

    const edditPost = async () => {
        const updatedPost = await updatePost(selectedPostId, title, body);

        const updatedPosts = posts.map(item => {
            if (item.id === updatedPost.id) {
                return updatedPost;
            }

            return item;
        });

        setPosts(updatedPosts);

    }
    const deletePost = async () => {
        const filteredTodos = posts.filter(({ id }) => id !== selectedPostId);

        try {
            await removePost(selectedPostId);

            setPosts(filteredTodos);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Link to="/">
                <h1>{`<- Posts`}</h1>
            </Link>

            <div className="PostInfo">
                <div className="PostInfo__header">
                    <button
                        type="button"
                        onClick={() => {
                            navigate('/creatPost');
                        }}
                    >
                        Create new post
                    </button>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            edditPost();
                            navigate("/");
                        }}
                    >
                        <textarea
                            cols={60}
                            rows={2}
                            placeholder="Post title"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);

                            }}
                        >

                        </textarea>

                        <textarea
                            className="PostInfo__body"
                            cols={60}
                            rows={5}
                            placeholder="Post body"
                            value={body}
                            onChange={(event) => {
                                setBody(event.target.value);

                            }}
                        >

                        </textarea>
                        <br />

                        <button
                            type="button"
                            onClick={() => {
                                deletePost();
                                navigate("/");
                            }}
                        >
                            Delete
                        </button>

                        {` `}

                        <button
                            type="submit"
                        >
                            Update
                        </button>
                    </form>


                    <p>
                        {' Posted by  '}

                        <UserInfo user={postsWithCommentsUser[selectedPostId - 1].user} />
                    </p>
                </div>


                <hr />

                {postsWithCommentsUser[selectedPostId - 1].comments.length > 0
                    ? (
                        <CommentList comments={postsWithCommentsUser[selectedPostId - 1].comments} />
                    )
                    : (
                        <b>
                            No comments yet
                        </b>
                    )}
            </div>
        </>
    );
};