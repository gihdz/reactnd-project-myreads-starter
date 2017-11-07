import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelfs from './Bookshelfs';
import SearchBookForm from './SearchBooksForm';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };
  componentDidMount() {
    this.getBooks();
  }
  getBooks() {
    let { books } = this.state;
    NProgress.start();
    BooksAPI.getAll().then(res => {
      console.log(res);
      books = res;
      NProgress.done();
      this.setState({ books });
    });
  }
  changeBookToShelf(bookId, shelf) {
    console.log(bookId, shelf);
    NProgress.start();
    BooksAPI.update({ id: bookId }, shelf)
      .then(res => {
        console.log(res);
        NotificationManager.info('Success!');
        NProgress.done();
        this.getBooks();
      })
      .catch(err => NotificationManager.danger('Request error!'));
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
        <Route
          path="/search"
          render={() => (
            <SearchBookForm
              myBooks={this.state.books}
              changeBookToShelf={this.changeBookToShelf.bind(this)}
            />
          )}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default BooksApp;
