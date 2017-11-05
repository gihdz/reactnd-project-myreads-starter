import React from 'react';
import Book from './Book';

class Bookshelfs extends React.Component {
  render() {
    const books = this.props.books;
    const currentlyReading = books
      .filter(r => r.shelf === 'currentlyReading')
      .map(r => <Book key={r.id} book={r} />);
    const wantToRead = books
      .filter(r => r.shelf === 'wantToRead')
      .map(r => <Book key={r.id} book={r} />);
    const read = books
      .filter(r => r.shelf === 'read')
      .map(r => <Book key={r.id} book={r} />);
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
          <a onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </a>
        </div>
      </div>
    );
  }
}

export default Bookshelfs;
