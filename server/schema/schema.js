const graphql = require("graphql");
const _ = require("lodash");

//dummy data
let usersData = [
  { id: "1", name: "Bob", age: 36 },
  { id: "2", name: "Angela", age: 16 },
  { id: "3", name: "Cebula", age: 34 },
  { id: "4", name: "Andrzej", age: 50 },
  { id: "5", name: "Greg", age: 43 },
  { id: "6", name: "Wika", age: 25 },
  { id: "7", name: "Bogdan", age: 77 },
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
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        return _.find(usersData, {
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
