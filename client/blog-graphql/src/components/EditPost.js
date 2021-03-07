import React, { useEffect, useState } from "react";
import { createPost } from "../graphql/mutations";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { divide } from "lodash";

export const EditPost = (post) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [postOwnerId, setPostOwnerId] = useState("");
  const [postOwnerUsername, setPostOwnerUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postData, setPostData] = useState({
    postTitle: post.postTitle,
    postBody: post.postBody,
  });

  useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      setPostOwnerId(user.attributes.sub);
      setPostOwnerUsername(user.username);
    });
  }, []);

  const handleModal = () => {
    setShow(!show);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const handleUpdatePost = () => {
    setShow(!show);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      {show && (
        <div className="modal">
          <button onClick={handleModal} className="close">
            X
          </button>

          <form
            className="add-post"
            action=""
            onSubmit={(event) => {
              handleUpdatePost(event);
            }}>
            <input
              style={{ fontSize: "19px" }}
              type="text"
              placeholder="Title"
              value={postData.postTitle}
              onChange={handleTitle}
            />
            <input
              style={{ fontSize: "19px", height: "150px" }}
              type="text"
              placeholder="Title"
              value={postData.postBody}
              onChange={handleBody}
            />
            <button>Update Post</button>
          </form>
        </div>
      )}
      <button
        onClick={() => {
          handleModal();
        }}>
        Edit
      </button>
    </>
  );
};
