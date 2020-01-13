import React, { useState, useEffect } from "react";

import ReactLoading from "react-loading";
import Header from "./component/Header";
import BookContainer from "./container/BookContainer";
import SearchContainer from "./container/SearchContainer";

const App = () => {
  const [books, setBooks] = useState([]);
  const [curBook, setCurBook] = useState({});
  const [query, setQuery] = useState("");
  const [recs, setRecs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    _fetchBooks();
  }, [books.length]);

  const _fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/books");
    const json = await res.json();
    setBooks(json);
    setLoading(false);
  };

  const _clearRecs = () => {
    setLoading(true);
    setQuery("");
    setRecs([]);
    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className="item-container">
        <SearchContainer
          recs={recs}
          curBook={curBook}
          setRecs={setRecs}
          setLoading={setLoading}
          clearRecs={_clearRecs}
          setQuery={setQuery}
          query={query}
        />
        {isLoading ? (
          <ReactLoading type={"spin"} color={"#000"} height={36} width={36} />
        ) : (
          <BookContainer
            books={books}
            query={query}
            recs={recs}
            setRecs={setRecs}
            setCurBook={setCurBook}
            isLoading={isLoading}
            setLoading={setLoading}
          />
        )}
      </div>
    </>
  );
};

export default App;
