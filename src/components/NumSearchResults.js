import React from 'react';
import numeral from 'numeral';

const NumSearchResults = ({ totalHits, searchResult }) => (
  <p style={{ margin: "16px" }}>
    {numeral(totalHits).format("0,0")} result(s) for "{searchResult}"
  </p>
);

export default NumSearchResults;
