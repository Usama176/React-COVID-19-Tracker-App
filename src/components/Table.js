import React from "react";
import "../components_css/Table.css";
import numeral from "numeral";

// table contains all countries cases
function Table({ countries }) {
  return (
    <div className= "table">
      {countries.map((country) => (
        <tr>
          <td key={country.key} >{ country.country }</td>
          <td style={{ color:"#cc1034" }} >
            <strong>{ numeral(country.cases).format("0,0") }</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
