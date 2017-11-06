import React from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Bookshelfs extends React.Component {
  render() {
    const books = this.props.books;
    const currentlyReading = books
      .filter(r => r.shelf === 'currentlyReading')
      .map(r => (
        <Book
          key={r.id}
          book={r}
          changeBookToShelf={this.props.changeBookToShelf}
        />
      ));
    const wantToRead = books
      .filter(r => r.shelf === 'wantToRead')
      .map(r => (
        <Book
          key={r.id}
          book={r}
          changeBookToShelf={this.props.changeBookToShelf}
        />
      ));
    const read = books
      .filter(r => r.shelf === 'read')
      .map(r => (
        <Book
          key={r.id}
          book={r}
          changeBookToShelf={this.props.changeBookToShelf}
        />
      ));
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">{currentlyReading}</ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">{wantToRead}</ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">{read}</ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
Bookshelfs.propTypes = {
  books: PropTypes.array.isRequired,
  changeBookToShelf: PropTypes.func.isRequired
};
export default Bookshelfs;
