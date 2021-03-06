import React from 'react';
import PropTypes from 'prop-types';
class Book extends React.Component {
  changeBookShelf(bookId) {
    this.props.changeBookToShelf(bookId, this.ddlShelfChanger.value);
  }
  render() {
    const { book } = this.props;
    const imageUrl = `url(${book.imageLinks.smallThumbnail})`;
    const authors = book.authors ? book.authors.join(', ') : '';
    const shelf = book.shelf ? book.shelf : 'none';
    const shelfChangerClass = book.shelf
      ? 'book-shelf-changer'
      : 'book-shelf-changer not-in-shelf';
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: imageUrl
              }}
            />
            <div className={shelfChangerClass}>
              <select
                ref={input => (this.ddlShelfChanger = input)}
                value={shelf}
                onChange={this.changeBookShelf.bind(this, book.id)}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}
Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeBookToShelf: PropTypes.func.isRequired
};
export default Book;
