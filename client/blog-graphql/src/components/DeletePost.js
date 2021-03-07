import React, { useEffect, useState } from "react";
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const DeletePost = () => {
  useEffect(() => {}, []);

  return <button>Delete</button>;
};
