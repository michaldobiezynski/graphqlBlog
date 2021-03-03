const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { mongoURL } = require("./config");
const mongoose = require("mongoose");

const cors = require("cors");
const port = process.env.PORT || 4000;

mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", () => {
  console.log("Yes! We are connected!");
});

const schema = require("./schema/schema");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
