import React, { useState, useEffect } from "react";
import { createComment, createPost } from "../graphql/mutations";
import { API, Auth, graphqlOperation } from "aws-amplify";

export const CreateCommentPost = () => {
  const [commentOwnerId, setCommentOwnerId] = useState("");
  const [commentOwnerUsername, setCommentOwnerUsername] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      setCommentOwnerId(user.attributes.sub);
      setCommentOwnerUsername(user.username);
    });
  }, []);

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    const input = {
      commentPostId: postId,
      commentOwnerId: commentOwnerId,
      commentOwnerUsername: commentOwnerUsername,
      content: content,
      createdAt: new Date().toISOString(),
    };

    await API.graphql(graphqlOperation(createComment, { input }));

    setContent("");
  };

  return (
    <div>
      <form action="" className="add-comment" onSubmit={handleAddComment}>
        <textarea
          required
          placeholder="Add your comment..."
          name="content"
          id=""
          cols="40"
          rows="3"
          value={content}
          onChange={handleChangeContent}
        />

        <input
          style={{ fontSize: "19px" }}
          className="btn"
          value="Add Comment"
        />
      </form>
    </div>
  );
};
