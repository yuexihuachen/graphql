const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const app = express()
const graphiqlSchema = require("./graphql/schema/index");
const graphiqlResolvers = require("./graphql/resolvers/index")
const isAuth = require("./middleware/is-auth")
app.use(bodyParser.json());

app.use(isAuth)

app.use("/graphql", graphqlHTTP({
    schema: graphiqlSchema,
    rootValue: graphiqlResolvers,
    graphiql: true
}))

const uri = `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
}@clustergraphql.oqtebrr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(() => {
    app.listen(3000)
})
.catch(err => console.log(err))

