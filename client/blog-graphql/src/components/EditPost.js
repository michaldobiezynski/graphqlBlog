import React, { useEffect, useState } from "react";
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const EditPost = () => {
  useEffect(() => {}, []);

  return <button>Edit</button>;
};
