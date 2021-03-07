import React, { useEffect, useState } from "react";
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

import { DeletePost } from "./DeletePost";
import { EditPost } from "./EditPost";

export const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const result = await API.graphql(graphqlOperation(listPosts));

      setPosts(result.data.listPosts.items);

      //   console.log("All posts: ", result.data.listPosts.items);
    };
    getPosts();
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
                <DeletePost />
                <EditPost />
              </span>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
