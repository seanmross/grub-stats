import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const Search = () => {

  return (
    <Paper  className="search">
      <InputBase
        autoFocus
        name="search"
        className="search__input"
        placeholder="Search..."
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;