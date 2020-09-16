import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { TextField, IconButton } from "@material-ui/core/";
import { db, firebase } from "../firebase";
import { AccountCircle, Send } from "@material-ui/icons/";

function Posts({ postid, username, caption, imageurl }) {
  const [postId] = useState(postid);
  const [comments, setComments] = useState();
  const [ucomment, setUComment] = useState("");

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("post")
        .doc(postId)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => {
          //  console.log(snap.docs[0]?.data());
          setComments(
            snap.docs.map((d) => ({
              id: d.id,
              messages: d.data(),
            }))
          );
        });
      setUComment("");
    }

    //effect
    return () => {
      //cleanup
      unsubscribe();
    };
  }, [postId]);

  const handlePostComment = (e) => {
    e.preventDefault();
    db.collection("post").doc(postId).collection("message").add({
      username: username,
      comment: ucomment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setUComment("");
  };

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
      <img className="post__image" src={imageurl} alt="description" />

      <h4 className="post__text">{caption}</h4>
      {comments &&
        comments.map((c) => (
          <div key={c.id}>
            <p>{c.messages.username}</p>:<p>{c.messages.comment}</p>
          </div>
        ))}

      {
        //for posting comments:

        <div>
          <AccountCircle />

          <TextField
            value={ucomment}
            label="your thoughts?"
            onChange={(e) => {
              setUComment(e.target.value);
            }}
          />

          <IconButton
            color="secondary"
            aria-label="post comment"
            onClick={handlePostComment}
          >
            <Send />
          </IconButton>

          {/* <input
              type="text"
              onChange={(e) => setUComment(e.target.value)}
              value={ucomment}
            ></input>
            <button onClick={handlePostComment}>Post Comment</button> */}
        </div>
      }
    </div>
  );
}

export default Posts;
