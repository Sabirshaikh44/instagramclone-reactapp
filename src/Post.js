import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Post.css";
import { Avatar } from "@mui/material";
import firebase from "firebase";

export default function Post({ postId, user, imageUrl, username, caption }) {
  //  console.log(postId)

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header" >
        <Avatar
          className="post__avatar"
          src="https://www.kindpng.com/picc/m/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent.png"
          alt="post__avatar"
        />
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt="postimage" className="post__image" />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      <p className="post__commentsCount">
        {comments.length > 1 ? "View all" : "View"} {comments.length}{" "}
        {comments.length > 1 ? "comments" : "comment"}
      </p>

      <div className="post__comments">
        {comments.map((comment) => {
          return (
            <p>
              <b>{comment.username}</b> {comment.text}
            </p>
          );
        })}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>

          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
