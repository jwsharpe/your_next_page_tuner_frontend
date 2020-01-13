import React from "react";
import RecBar from "../component/RecBar";
import SearchBar from "../component/SearchBar";

const SearchContainer = props => {
  const _findRecommendations = async e => {
    e.preventDefault();
    props.setLoading(true);
    const body = {
      text: props.titles
    };

    const content = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };

    const res = await fetch("http://localhost:5000/books", content);
    const json = await res.json();
    const titles = json.map(e => e.titles);
    props.setRecs(["" + props.titles, ...titles]);
    props.setLoading(false);
  };

  return (
    <div id="search">
      {props.recs.length ? (
        <RecBar book={props.recs[0]} clearRecs={props.clearRecs} />
      ) : (
        <SearchBar setQuery={props.setQuery} query={props.query} />
      )}
      <h4>{props.curBook.titles}</h4>
      <p>{props.curBook.description}</p>
    </div>
  );
};

export default SearchContainer;
