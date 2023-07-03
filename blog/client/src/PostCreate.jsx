import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [ title, setTitle ] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://127.0.0.1:4000/posts', { title });

        setTitle('');
    }
    return (
        <di>
            <h1>Create Post</h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label> Title </label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="form-control" type="text" />
                </div>

                <button className="btn btn-primary" style={{marginTop: '20px'}}> Submit </button>
            </form>
        </di>
    );
};

export default PostCreate;
