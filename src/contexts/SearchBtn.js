import { createContext, useEffect, useState } from "react";

export const SearchBtn = createContext();

export function SearchBtnProvider({ children }) {

  const [searchMovies, setSearchMovies] = useState();

  useEffect(()=>{
      setSearchMovies(searchMovies)
  },[searchMovies])

  return (
    <SearchBtn.Provider value={{ setSearchMovies, searchMovies }}>
      {children}
    </SearchBtn.Provider>
  );
}
