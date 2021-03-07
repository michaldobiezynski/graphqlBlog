import React, { useEffect, useState } from "react";

export const CreatePost = () => {
  const [postOwnerID, setPostOwnerID] = useState("");
  const [postOwnerUserName, setPostOwnerUserName] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const handleAddPost = async (event) => {
    event.preventDefault();

    const input = {
      postOwnerId: postOwnerID,
      postOwnerUserName: postOwnerUserName,
      postTitle: postTitle,
      postBody: postBody,
      createdAt: new Date().toISOString(),
    };
  };

  useEffect(() => {
    // TODO: TBA
  }, []);

  return (
    <form className="add-post" onSubmit={handleAddPost} action="">
      <input
        style={{ font: "19px" }}
        type="text"
        placeholder="Title"
        name="postTitle"
      />
      <textarea
        type="text"
        name="postBody"
        rows="3"
        cols="40"
        required
        placeholder="New Blog Post"
      />
      <input type="submit" className="btn" style={{ fontSize: "19px" }} />
    </form>
  );
};
