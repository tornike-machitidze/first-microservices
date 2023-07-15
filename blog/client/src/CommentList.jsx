import React from 'react';

const CommentList = ({ comments }) => {
    const renderComments = comments.map((comment) => {
        let content;

        if (comment.status === 'approved') {
            content = comment.content;
        }

        if (comment.status === 'pending') {
            content = 'This comment is awaiting for moderation!';
        }

        if (comment.status === 'rejected') {
            content = 'This comment has been rejected';
        }

        return (
            <li key={comment.id}>
                <p>{content}</p>
            </li>
        );
    });
    return (
        <div>
            <br />
            <ul>{renderComments}</ul>
        </div>
    );
};

export default CommentList;
