import React, { Component } from 'react';

// graphql client apollo handles passage of data between server and browser
// apollo-boost bundles some required functionalities
import ApolloClient from 'apollo-boost';

// wraps application and inject all data received from server into our application
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

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