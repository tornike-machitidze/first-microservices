import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(`http://127.0.0.1:4001/posts/${postId}/comments`);
        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, [comments]);

    const renderComments = comments.map((comment) => {
        return (
            <li key={comment.id}>
                <p>{comment.content}</p>
            </li>
        );
    });
    return (
        <div>
            <br />
            <ul>
                { renderComments }
            </ul>
        </div>
    );
};

export default CommentList;
