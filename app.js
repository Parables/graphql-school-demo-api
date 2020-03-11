const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
var cors = require('cors')

const api_schema = require("./graphql/schema/my_schema.gql");
const api_resolvers = require("./graphql/resolvers/api_resolvers");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHttp({
    schema: api_schema,
    rootValue: api_resolvers,
    graphiql: true
  })
);

//const uri = `mongodb+srv://${process.env.Username}:${process.env.Password}@parasoft-cluster1-msqxi.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;
mongoose
  .connect(process.env.ConString, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(process.env.PORT || 3090, function() {
      console.log(`App starting on Port ${process.env.PORT} ...`);
      console.log("DB Connection was successful");
    });
  })
  .catch(err => {
    console.log(err);
  });
