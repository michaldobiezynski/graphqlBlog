import React, { useEffect } from "react";
import { deletePost } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export const DeletePost = ({ postId }) => {
  useEffect(() => {}, []);

  const handleDeletePost = async (postId) => {
    const input = {
      id: postId,
    };
    await API.graphql(graphqlOperation(deletePost, { input }));
  };

  return (
    <button
      onClick={() => {
        handleDeletePost(postId);
      }}>
      Delete
    </button>
  );
};
