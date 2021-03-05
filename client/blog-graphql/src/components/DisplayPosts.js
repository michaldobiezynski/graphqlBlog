import React, { useEffect, useState } from "react";
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

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

  return (
    <div>
      <ul>
        {posts.map((_post) => {
          return (
            <div className="posts" key={_post.id}>
              <h1 key={_post.id}>{_post.postTitle}</h1>
              <span>
                {`Wrote by: `} {_post.postOwnerUsername}
                <br />
                <time>
                  {" on "} {new Date(_post.createdAt).toDateString()}
                </time>
              </span>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
