import React, { Component } from 'react';

// graphql client apollo handles passage of data between server and browser
// Apollo Boost includes some packages that are essential to developing with Apollo Client
import ApolloClient from 'apollo-boost';

// React Apollo allows you to fetch data from your GraphQL server and use it in React

// Apollo Provider provides the React Apollo functionality 
// to all the other components in the application without passing it explicitly.

// It uses the Context api of React which provides a way to share values (in this case - "client") 
// between components without having to explicitly pass a prop through every level of the tree.
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

// construct an instance of the core class ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

/*
  If you'd like to directly execute a query with your client, 
  you may now call the client.query method like this:

  client.query({
    query: gql`
      query TodoApp {
        todos {
          id
          text
          completed
        }
      }
    `,
  })
    .then(data => console.log(data))
    .catch(error => console.error(error));
*/

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="App">
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;