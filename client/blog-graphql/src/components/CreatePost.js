import React, { useEffect, useState } from "react";
import { createPost } from "../graphql/mutations";
import { API, Auth, graphqlOperation } from "aws-amplify";

export const CreatePost = () => {
  const [postOwnerID, setPostOwnerID] = useState("");
  const [postOwnerUserName, setPostOwnerUserName] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const handleAddPost = async (event) => {
    event.preventDefault();

    const input = {
      postOwnerId: postOwnerID,
      postOwnerUsername: postOwnerUserName,
      postTitle: postTitle,
      postBody: postBody,
      createdAt: new Date().toISOString(),
    };

    await API.graphql(graphqlOperation(createPost, { input }));
    setPostTitle("");
    setPostBody("");
  };

  useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      setPostOwnerID(user.attributes.sub);
      setPostOwnerUserName(user.username);
      // console.log("Curr: User: ", user.username);
      // console.log("Attr ", user.attributes.sub);
    });
  }, []);

  return (
    <form className="add-post" onSubmit={handleAddPost} action="">
      <input
        style={{ font: "19px" }}
        type="text"
        placeholder="Title"
        name="postTitle"
        value={postTitle}
        onChange={(event) => {
          setPostTitle(event.target.value);
        }}
      />
      <textarea
        type="text"
        name="postBody"
        rows="3"
        cols="40"
        required
        placeholder="New Blog Post"
        value={postBody}
        onChange={(event) => {
          setPostBody(event.target.value);
        }}
      />
      <input type="submit" className="btn" style={{ fontSize: "19px" }} />
    </form>
  );
};
