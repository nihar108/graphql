// schema describes the data on the graph, the obj types, relation b/w the obj types and how we can reach into the graph to interact with the data - query/mutate
// it also defines root queries which desscribe how user can jump into graph and grab data

const graphql = require('graphql');

const {
  GraphQLObjectType, 
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

// dummy data
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
];

const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' }
];

// define object types
const BookType = new GraphQLObjectType({
  name: 'Book',
  // things we send back to the client
  fields: () => ({
    id: { type: GraphQLID }, // GraphQLID adds flexibility, graphql converts the arg to string internally
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      // parent has book result that we get from the query
      resolve(parent, args) {
        return authors.filter(author => {
          return parent.authorId === author.id;
        })[0]
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
});

// define root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // fired when we receive the query
        // code to get data form db / other sources
        console.log(typeof(args.id));
        return books.filter(book => {
          return book.id === args.id
        })[0];
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.filter(author => {
          return author.id === args.id
        })[0];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})

