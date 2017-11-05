import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelfs from './Bookshelfs';
import SearchBookForm from './SearchBooksForm';

class BooksApp extends React.Component {
  state = {
    books: []
  };
  componentDidMount() {
    this.getBooks();
  }
  getBooks() {
    let { books } = this.state;
    BooksAPI.getAll().then(res => {
      console.log(res);
      books = res;
      this.setState({ books });
    });
  }
  changeBookToShelf(bookId, shelf) {
    console.log(bookId, shelf);
    BooksAPI.update({ id: bookId }, shelf).then(res => {
      console.log(res);
      this.getBooks();
    });
  }
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Bookshelfs
              books={this.state.books}
              changeBookToShelf={this.changeBookToShelf.bind(this)}
            />
          )}
        />
        <Route path="/search" component={SearchBookForm} />
      </div>
    );
  }
}

export default BooksApp;
