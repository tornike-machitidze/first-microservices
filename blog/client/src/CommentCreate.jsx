import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`http://127.0.0.1:4001/posts/${postId}/comments`, { content });
        setContent('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label> New Comment </label>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control"
                        type="text"
                    />
                </div>

                <button className="btn btn-dark" style={{marginTop: '20px'}}>Add</button>
            </form>
        </div>
    );
};

export default CommentCreate;
