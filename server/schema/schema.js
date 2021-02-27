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
  },
  {
    id: "2",
    title: "Rowing",
    description: "Sweat and feel better before eating donuts",
  },
  {
    id: "3",
    title: "Swimming",
    description: "Get in the water",
  },
  {
    id: "4",
    title: "Fencing",
    description: "Hobby for fency people",
  },
  {
    id: "5",
    title: "Hiking",
    description: "Explore the world",
  },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
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
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
