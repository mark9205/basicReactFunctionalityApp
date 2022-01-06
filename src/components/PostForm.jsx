import React, { useState } from "react";
import Mybutton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";

const PostForm = ({create}) => {
    const [post, setPost] = useState({ title: "", body: "" });

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post,
            id: Date.now(),
        };
        create(newPost);
        setPost({ title: "", body: "" });
    };

    return (
        <form>
            <MyInput
                value={post.title}
                type="text"
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                placeholder="Название поста"
            />
            <MyInput
                value={post.body}
                type="text"
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                placeholder="Описание поста"
            />
            <Mybutton onClick={addNewPost}>Создать пост</Mybutton>
        </form>
    );
};

export default PostForm;
