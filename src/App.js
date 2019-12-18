import React, { useState, useEffect } from "react";
import Book from "./component/Book";
import RecBar from "./component/RecBar";
import SearchBar from "./component/SearchBar";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    _fetchBooks();
  }, [books.length]);

  const _fetchBooks = () => {
    fetch("http://localhost:5000/books")
      .then(e => e.json())
      .then(books => setBooks(books[0]));
  };

  const _filterBooks = () => {
    let filteredBooks = [...books];

    if (query.length && !recs.length) {
      filteredBooks = books.filter(book =>
        ("" + book.titles).toLowerCase().includes(query.toLowerCase())
      );
    }

    if (recs && recs.length) {
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
      <Book setRecs={setRecs} key={book.index} {...book} />
    ));
  };

  const _clearRecs = () => {
    setQuery("");
    setRecs([]);
  };

  return (
    <>
      <div id="search">
        {recs.length ? (
          <RecBar book={recs[0]} clearRecs={_clearRecs} />
        ) : (
          <SearchBar setQuery={setQuery} query={query} />
        )}
      </div>
      <ul>{_filterBooks()}</ul>
    </>
  );
};

export default App;
