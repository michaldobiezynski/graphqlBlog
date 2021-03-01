const graphql = require("graphql");
const _ = require("lodash");
const User = require("../model/User");
const Hobby = require("../model/Hobby");
const Post = require("../model/Post");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;

//Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: GraphQLList(PostType),
      resolve(parent, args) {
        // return _.filter(postData, { userId: parent.id });
      },
    },
    hobbies: {
      type: GraphQLList(HobbyType),
      resolve(parent, args) {
        // return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        // return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        // return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        // return _.find(usersData, {
        //   id: args.id,
        // });
        // we resolve with data
        // get and return data from a datasource
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // return usersData;
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        // return _.find(hobbiesData, {
        //   id: args.id,
        // });
        // we resolve with data
        // get and return data from a datasource
      },
    },

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        // return hobbiesData;
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        // return _.find(postData, {
        //   id: args.id,
        // });
        // we resolve with data
        // get and return data from a datasource
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        // return postData;
      },
    },
  },
});

//Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        // id: {type: GraphQLID}
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },

      resolve(parent, args) {
        let user = new User({
          name: args.name,
          age: args.age,
          profession: args.profession,
        });
        //save to our db
        user.save();

        return user;
      },
    },
    createPost: {
      type: PostType,
      args: {
        // id: {type: GraphQLID}
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },

      resolve(parent, args) {
        let post = {
          id: args.id,
          comment: args.comment,
          userId: args.userId,
        };

        return post;
      },
    },
    createHobby: {
      type: HobbyType,
      args: {
        // id: {type: GraphQLID}
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },

      resolve(parent, args) {
        let hobby = {
          id: args.id,
          title: args.title,
          description: args.description,
          userId: args.userId,
        };

        return hobby;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
