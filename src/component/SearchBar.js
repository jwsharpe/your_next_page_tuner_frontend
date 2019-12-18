import React from "react";
import { Input } from "@material-ui/core";

const SearchBar = props => {
  const _handleSearch = e => {
    e.persist();
    const text = e.target.value;
    props.setQuery(text);
  };

  return (
    <Input
      name="search"
      onChange={_handleSearch}
      value={props.query}
      placeholder="search"
      label="Search"
      variant="outlined"
      fullWidth
    />
  );
};

export default SearchBar;
