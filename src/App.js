import React, { useState, useEffect } from "react";
import Book from "./component/Book";
import RecBar from "./component/RecBar";
import SearchBar from "./component/SearchBar";
import Header from "./component/Header";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    _fetchBooks();
  }, [books.length]);

  const _fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/books");
    const json = await res.json();
    console.log(json[0]);
    setBooks(json[0]);
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
          recs.findIndex(recTitle => {
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
      <Header />
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
