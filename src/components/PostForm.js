import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../services/postService";

export default function PostForm({
  posts,
  setPosts,
  editingPost,
  setEditingPost,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault(); // without this reloads automatically on click of Add post button

    if (editingPost) {
      editPost();
    } else {
      addPost();
    }
    setTitle("");
    setBody("");
    setEditingPost(null);
  };

  const addPost = () => {
    const post = { title, body };
    createPost(post)
      .then((res) => {
        // take current state, filter not the to be deleted id
        setPosts([...posts, res.data]);
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPost = () => {
    updatePost(editingPost.id, { title, body })
      .then((res) => {
        setPosts(
          posts.map((post) => (post.id === editingPost.id ? res.data : post))
        );
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Title</div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>Body</div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div>
        <button type="submit"> {editingPost ? "Edit Post" : "Add Post"}</button>
      </div>
    </form>
  );
}
