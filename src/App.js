import React, { Component } from "react";
import Book from "./component/Book";
import RecBar from "./component/RecBar";
import SearchBar from "./component/SearchBar";

export default class App extends Component {
  state = {
    books: [],
    query: "",
    recs: []
  };

  componentDidMount() {
    this._fetchBooks();
  }

  _fetchBooks = () => {
    fetch("http://localhost:5000/books")
      .then(e => e.json())
      .then(books => {
        for (let i = 0; i < 10; i++) {
          let b = books[0][i].genre.replace("[", "");
          b = b.replace("]", "");
          b = b.replace("'", "");
        }
        this.setState({ books: books[0] }, () => console.log(this.state.books));
      });
  };

  _setRecs = recs => {
    this.setState({
      query: "",
      recs: recs
    });
  };

  _filterBooks = () => {
    const books = [...this.state.books];

    let filteredBooks = books;

    if (this.state.query.length && !this.state.recs.length) {
      filteredBooks = books.filter(book =>
        ("" + book.titles)
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      );
    }

    if (this.state.recs && this.state.recs.length) {
      filteredBooks = books.filter(book => {
        return (
          1 +
          this.state.recs.findIndex(recTitle => {
            return recTitle === "" + book.titles;
          })
        );
      });
    }

    return filteredBooks.map(book => (
      <Book setRecs={this._setRecs} key={book.index} {...book} />
    ));
  };

  _clearRecs = () => {
    this.setState({
      query: "",
      recs: []
    });
  };

  _setQuery = text => {
    this.setState({ query: text });
  };

  render() {
    return (
      <>
        {/* <button onClick={this._fetchBooks}>Fetch Books</button> */}
        <div id="search">
          {this.state.recs.length ? (
            <RecBar book={this.state.recs[0]} clearRecs={this._clearRecs} />
          ) : (
            <SearchBar setQuery={this._setQuery} query={this.state.query} />
          )}
        </div>
        <ul>{this._filterBooks()}</ul>
      </>
    );
  }
}
