import React, { useEffect, useState } from "react";
import { listPosts } from "../graphql/queries";
import {
  onCreateComment,
  onCreatePost,
  onDeletePost,
  onUpdatePost,
} from "../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";

import { DeletePost } from "./DeletePost";
import { EditPost } from "./EditPost";
import { createComment, updatePost } from "../graphql/mutations";
import { CreateCommentPost } from "./CreateCommentPost";
import { CommentPost } from "./CommentPost";
import { forEach } from "lodash";

export const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const result = await API.graphql(graphqlOperation(listPosts));

      setPosts(result.data.listPosts.items);

      //   console.log("All posts: ", result.data.listPosts.items);
    };
    getPosts();

    API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: (postData) => {
        const newPost = postData.value.data.onCreatePost;
        const prevPosts = posts.filter((post) => post.id !== newPost.id);

        const updatePosts = [newPost, ...prevPosts];

        setPosts(updatePosts);
      },
    });
    API.graphql(graphqlOperation(onCreateComment)).subscribe({
      next: (commentData) => {
        const createdComment = commentData.value.data.onCreateComment;

        let postsToBeUpdated = [...posts];

        posts.forEach((element) => {
          if (element.id == createComment.post.id) {
            element.comments.items.push(createdComment);
          }
        });

        setPosts(postsToBeUpdated);
      },
    });
    API.graphql(graphqlOperation(onDeletePost)).subscribe({
      next: (postData) => {
        const deletedPost = postData.value.data.onDeletePost;
        const prevPosts = posts.filter((post) => post.id !== deletedPost.id);

        const updatePosts = [...prevPosts];

        setPosts(updatePosts);
      },
    });
    API.graphql(graphqlOperation(onUpdatePost)).subscribe({
      next: (postData) => {
        const index = posts.findIndex((post) => post.id === updatePost.id);

        const updatedPost = postData.value.data.onUpdatePost;
        const updatedPosts = [
          ...posts.slice(0, index),
          updatedPost,
          ...posts.slice(index + 1),
        ];
        setPosts(updatedPosts);
      },
    });
    return function cleanup() {
      API.graphql(graphqlOperation(onCreatePost)).unsubscribe();
      API.graphql(graphqlOperation(onCreateComment)).unsubscribe();
      API.graphql(graphqlOperation(onDeletePost)).unsubscribe();
      API.graphql(graphqlOperation(onUpdatePost)).unsubscribe();
    };
  }, []);

  const rowStyle = {
    background: "#f4f4f4",
    padding: "10px",
    border: "1px #ccc doted",
    margin: "14px",
  };

  return (
    <div>
      <ul>
        {posts.map((_post) => {
          return (
            <div className="posts" key={_post.id} style={rowStyle}>
              <h1 key={_post.id}>{_post.postTitle}</h1>
              <span style={{ fontStyle: "italic", color: "#0ca5e297" }}>
                {`Wrote by: `} {_post.postOwnerUsername}
                <br />
                <time style={{ fontStyle: "italic" }}>
                  {" on "} {new Date(_post.createdAt).toDateString()}
                </time>
              </span>

              <p>{_post.postBody}</p>

              <br />
              <span>
                <DeletePost postId={_post.id} />
                <EditPost post={_post} />
              </span>

              <span>
                <CreateCommentPost postId={_post.id} />
              </span>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
