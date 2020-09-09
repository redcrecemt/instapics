import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
function Posts({username,caption,imageurl}) {
  return (
    <div className="posts">
      <div className="post__header">
        <Avatar
          className="post__avatar "
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img
        className="post__image"
        src={imageurl}
        alt="description"
      />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
}

export default Posts;
