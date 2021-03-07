import React, { useState } from "react";

export const CommentPost = (comment) => {
  return (
    <div className="comment">
      <span style={{ fontStyle: "italic", color: "#0ca5e297" }}>
        {"Comment by: "} {comment.commentData.commentOwnerUsername}
        {"on"}
        <time style={{ fontStyle: "italic" }}>
          {""}
          {new Date(comment.commentData.createdAt).toDateString()}
        </time>
      </span>
      <p>{comment.commentData.content}</p>
    </div>
  );
};
