import React, { useEffect } from "react";
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const DisplayPosts = () => {
  useEffect(() => {
    const getPosts = async () => {
      const result = await API.graphql(graphqlOperation(listPosts));
      console.log("All posts: ", JSON.stringify(result.data.listPosts.items));
    };
    getPosts();
  }, []);

  return <div>Hello World!</div>;
};
