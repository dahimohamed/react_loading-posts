import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PostInfo/PostInfo.scss';
import { createPost } from '../../api/posts';
import { Post } from '../../Types/posts';

interface Props {
    addPost: (post: Post) => void,
}

export const CreatingPost: React.FC<Props> = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const addNewPost = async () => {
        const newPost = await createPost(
            title,
            1,
            body,
        );

        addPost(newPost);
    };
    
    return (
        <div className="PostInfo__header">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    addNewPost();
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
                    type="submit"
                >
                    add new post
                </button>
            </form>

        </div>
    );
};