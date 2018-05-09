import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }
  displayAuthors() {
    // since multiple queries are composed together, 
    // they are accessed via the names assigned to them
    const data = this.props.getAuthorsQuery;
    if(data.loading) {
      return (<option disabled> Loading Authors</option>);
    }
    else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      })
    }
  }
  submitForm(e) {
    e.preventDefault();

    // since multiple queries are composed together, 
    // they are accessed via the names assigned to them

    // if we hadn't used compose, and there was only this mutation and no other query
    // we will receive a prop called "mutate", just like we receive "data" in case of a query
    // use it like mutate({variable: ...})
    this.props.addBookMutation({
      // gets passed in the request payload along with the query string
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    });
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({ genre: e.target.value })}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>

      </form>
    );
  }
}


// compose combines several queries and mutations to one component

// The graphql() function returns a function which will “enhance” any component 
// with reactive GraphQL capabilities. This follows the React higher-order component pattern 
// which is also used by react-redux’s connect function.
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);