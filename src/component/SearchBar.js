import React from "react";
import { TextField } from "@material-ui/core";
const SearchBar = props => {
  const _handleSearch = e => {
    e.persist();
    const text = e.target.value;
    props.setQuery(text);
  };

  return (
    <TextField
      name="search"
      onChange={_handleSearch}
      value={props.query}
      label="Search"
      variant="outlined"
      fullWidth
    />
  );
};

export default SearchBar;
