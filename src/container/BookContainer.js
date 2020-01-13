import React from "react";
import Book from "../component/Book";

const _filterBooks = props => {
  const {
    setCurBook,
    recs,
    query,
    books,
    setRecs,
    isLoading,
    setLoading
  } = props;
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
    <Book
      setRecs={setRecs}
      setCurBook={setCurBook}
      key={book.index}
      isLoading={isLoading}
      setLoading={setLoading}
      {...book}
    />
  ));
};

const BookContainer = props => {
  return <ul>{_filterBooks(props)}</ul>;
};

export default BookContainer;
