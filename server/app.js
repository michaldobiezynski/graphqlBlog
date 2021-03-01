const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { mongoURL } = require("../config");

const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(4000, () => {
  console.log("Server started at port 4000");
});
