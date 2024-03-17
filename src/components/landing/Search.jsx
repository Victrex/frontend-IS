import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [filtro, setFiltro] = useState("");

  const filtrar = (e) => {
    setFiltro(e.target.value);
  };

  return (
    <div className="searchHeader">
      <label htmlFor="search">
        <SearchIcon />
      </label>
      <input
        type="text"
        name="search"
        className="search"
        placeholder="¿Qué buscas?"
        onChange={filtrar}
      />
    </div>
  );
};

export default Search;
