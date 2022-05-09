import { createContext, useState } from "react";

export const SearchBtn = createContext();

export function SearchBtnProvider({ children }) {

  const [searchMovies, setSearchMovies] = useState('pesquisar');



  return (
    <SearchBtn.Provider value={{ setSearchMovies, searchMovies }}>
      {children}
    </SearchBtn.Provider>
  );
}
