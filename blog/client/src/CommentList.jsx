import React from 'react';

const CommentList = ({ comments }) => {
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
