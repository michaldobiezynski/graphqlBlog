import React, { useEffect, useState } from "react";
import { listPosts } from "../graphql/queries";
import {
  onCreateComment,
  onCreateLike,
  onCreatePost,
  onDeletePost,
  onUpdatePost,
} from "../graphql/subscriptions";
import { API, Auth, graphqlOperation } from "aws-amplify";

import { DeletePost } from "./DeletePost";
import { EditPost } from "./EditPost";
import { createComment, createLike, updatePost } from "../graphql/mutations";
import { CreateCommentPost } from "./CreateCommentPost";
import { CommentPost } from "./CommentPost";

import { FaThumbsUp } from "react-icons/fa";

export const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);
  const [ownerId, setOwnerId] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");
  const [isHovering, setIsHovering] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [postLikedBy, setPostLikedBy] = useState([]);

  let loggedInUser = ownerId;

  useEffect(() => {
    const getPosts = async () => {
      const result = await API.graphql(graphqlOperation(listPosts));

      setPosts(result.data.listPosts.items);

      //   console.log("All posts: ", result.data.listPosts.items);
    };
    getPosts();

    Auth.currentUserInfo().then((user) => {
      setOwnerId(user.attributes.sub);
      setOwnerUsername(user.username);
    });

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

        postsToBeUpdated.forEach((element) => {
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
    API.graphql(graphqlOperation(onCreateLike)).subscribe({
      next: (postData) => {
        const createdLike = postData.value.data.onCreateLike;

        let postsExisting = [...posts];
        postsExisting.forEach((post) => {
          if (createdLike.post.id === post.id) {
            post.likes.items.push(createdLike);
          }
        });
        setPosts(postsExisting);
      },
    });
    return function cleanup() {
      API.graphql(graphqlOperation(onCreatePost)).unsubscribe();
      API.graphql(graphqlOperation(onCreateComment)).unsubscribe();
      API.graphql(graphqlOperation(onDeletePost)).unsubscribe();
      API.graphql(graphqlOperation(onUpdatePost)).unsubscribe();
      API.graphql(graphqlOperation(onCreateLike)).unsubscribe();
    };
  }, []);

  const rowStyle = {
    background: "#f4f4f4",
    padding: "10px",
    border: "1px #ccc doted",
    margin: "14px",
  };

  const likedPost = (postId) => {
    posts.forEach((post) => {
      if (post.id == postId) {
        if (post.postOwnerId == ownerId) {
          return true;
        }
        post.likes.items.forEach((like) => {
          if (like.likeOwnerId == ownerId) {
            return true;
          }
        });
      }
    });
    return false;
  };

  const handleLike = async (postId) => {
    if (likedPost(postId)) {
      return setErrorMessage("Can't like your own post");
    } else {
      const input = {
        numberLikes: 1,
        likeOwnerId: ownerId,
        likeOwnerUsername: ownerUsername,
        likePostId: postId,
      };

      try {
        const result = await API.graphql(
          graphqlOperation(createLike, { input })
        );
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
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
                <span>
                  {_post.postOwnerId == loggedInUser && (
                    <DeletePost postId={_post.id} />
                  )}
                  {_post.postOwnerId == loggedInUser && (
                    <EditPost post={_post} />
                  )}
                  <p className="alert">
                    {_post.postOwnerId === loggedInUser ? errorMessage : ""}{" "}
                  </p>
                  <p
                    onClick={() => {
                      handleLike(_post.id);
                    }}>
                    <FaThumbsUp></FaThumbsUp>
                    {_post.likes.items.length}
                  </p>
                </span>
              </span>

              <span>
                <CreateCommentPost postId={_post.id} />
                {_post.comments.items && (
                  <span style={{ fontSize: "19px", color: "gray" }}>
                    Comments:
                  </span>
                )}
                {_post.comments.items &&
                  _post.comments.items.map((comment, index) => {
                    return <CommentPost key={index} commentData={comment} />;
                  })}
              </span>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
