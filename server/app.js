const express = require('express');

// allows express to understand graphql. used as a middleware on a single route which will be an endpoint to interact with graphql data.
const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

// /graphql route that we use the middleware on
// it needs a schema to know what the graph exactly looks
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening to port 4000');
})