import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { NotificationManager } from 'react-notifications';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import PropTypes from 'prop-types';

class SearchBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleChange.bind(this);
    this.state = {
      query: '',
      timeOutId: '',
      books: []
    };
  }
  handleChange(e) {
    this.setState({ query: e.target.value }, this.handleTimeout);
  }
  handleTimeout() {
    let { timeOutId } = this.state;
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      const { query } = this.state;
      this.searchBooks(query);
    }, 1000);
    this.setState({ timeOutId });
  }
  searchBooks(query) {
    if (!query) return;
    NProgress.start();
    console.log('query: ', query);
    BooksAPI.search(query).then(res => {
      const books = Array.isArray(res) ? res : res.items;
      if (books.length === 0) NotificationManager.warning('No search results!');
      NProgress.done();
      this.setState({ books });
    });
  }
  render() {
    let { books } = this.state;
    const { myBooks } = this.props;

    books = books.map(b => {
      let book = myBooks.find(mb => b.id === mb.id);
      if (book) b.shelf = book.shelf;
      return b;
    });
    books = this.state.books.map(r => (
      <Book
        key={r.id}
        book={r}
        changeBookToShelf={this.props.changeBookToShelf}
      />
    ));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{books}</ol>
        </div>
      </div>
    );
  }
}
SearchBookForm.propTypes = {
  myBooks: PropTypes.array.isRequired,
  changeBookToShelf: PropTypes.func.isRequired
};
export default SearchBookForm;
