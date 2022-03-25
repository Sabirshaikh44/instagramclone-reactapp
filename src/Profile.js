import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Profile.css";
import { Avatar} from "@mui/material";



export default function Profile({ user }) {
  const [userposts, setUserposts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .where("username", "==", `${user}`)
      .onSnapshot((snapshot) => {
        setUserposts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            posts: doc.data(),
          }))
        );
      });
  }, [user]);

  return (
    <div className="profile">
      {user ? (
        <div className="profile__infoContainer">
          <div className="profile__header">
            <Avatar
              className="post__avatar"
              src="https://www.kindpng.com/picc/m/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent.png"
              alt="post__avatar"
            />
            <p className="profile__username">
              <b>{user}</b>
            </p>
          </div>
          {userposts.length >= 1 ? (
            <div className="profile__text">
              <div>
                <p className="profile__totalPosts">
                  <strong>{userposts.length}</strong> Post in Total
                </p>
              </div>
            </div>
          ) : (
            <div className="profile__text">
              <p>Post 0</p>
            </div>
          )}
        </div>
      ) : (
        <div className="profile__infoContainer">
          <p>
            Please{" "}
            <span className="profile__highlightedtext">SignUp/Login</span> to
            Continue, click Above buttons to do so...
          </p>
        </div>
      )}

      <div className="profile__userPosts">
        <div className="profile__allpostsContainer">
          {userposts.map((eachposts, index) => {
            // console.log(eachposts.posts.imageUrl);

            return (
             
                    <img
                      key={index}
                      id={index}
                      className="profile__postsImage"
                      src={eachposts.posts.imageUrl}
                      alt="Postimages"
                      
                    />
                  
            );
          })}
        </div>
      </div>
    </div>
  );
}
