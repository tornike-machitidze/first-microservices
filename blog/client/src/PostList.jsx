import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts, setPosts] = useState({});

    // fetches posts from only query service
    const fetchPosts = async () => {
        const res = await axios.get('http://127.0.0.1:4002/posts'); // query service
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map((post) => {
        return (
            <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>

                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return (
        <>
            <h1>PostList</h1>
            <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>
        </>
    );
};

export default PostList;
