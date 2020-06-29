import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';

const Search = ({ searchValue, change, clear }) => {

  return (
    <Paper className="search">
      <InputBase
        autoFocus
        name="search"
        className="search__input"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => change(e)}
        id='search'
      />
      {searchValue.length > 0 && (
        <IconButton type="button" aria-label="close" onClick={() => clear()}>
          <CloseIcon />
        </IconButton>
      )}

      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;