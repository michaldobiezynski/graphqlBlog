const graphql = require("graphql");
const _ = require("lodash");

//dummy data
let usersData = [
  { id: "1", name: "Bob", age: 36, profession: "footballer" },
  { id: "2", name: "Angela", age: 16, profession: "hairdresser" },
  { id: "3", name: "Cebula", age: 34, profession: "painted" },
  { id: "4", name: "Andrzej", age: 50, profession: "chef" },
  { id: "5", name: "Greg", age: 43, profession: "programmer" },
  { id: "6", name: "Wika", age: 25, profession: "builder" },
  { id: "7", name: "Bogdan", age: 77, profession: "manager" },
];

let hobbiesData = [
  {
    id: "1",
    title: "Programming",
    description: "Using computers to make a better world",
    userId: "1",
  },
  {
    id: "2",
    title: "Rowing",
    description: "Sweat and feel better before eating donuts",
    userId: "2",
  },
  {
    id: "3",
    title: "Swimming",
    description: "Get in the water",
    userId: "3",
  },
  {
    id: "4",
    title: "Fencing",
    description: "Hobby for fency people",
    userId: "4",
  },
  {
    id: "5",
    title: "Hiking",
    description: "Explore the world",
    userId: "5",
  },
];

//Post type
let postData = [
  { id: "1", comment: "blabla", userId: "1" },
  { id: "2", comment: "gafga", userId: "1" },
  { id: "3", comment: "another comment", userId: "2" },
  { id: "4", comment: "hahah", userId: "3" },
  { id: "5", comment: "words words", userId: "4" },
];

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
        return _.filter(postData, { userId: parent.id });
      },
    },
    hobbies: {
      type: GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
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
        return _.find(usersData, { id: parent.userId });
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
        return _.find(usersData, { id: parent.userId });
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
        return _.find(usersData, {
          id: args.id,
        });
        // we resolve with data
        // get and return data from a datasource
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(hobbiesData, {
          id: args.id,
        });
        // we resolve with data
        // get and return data from a datasource
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(postData, {
          id: args.id,
        });
        // we resolve with data
        // get and return data from a datasource
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
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession,
        };

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
