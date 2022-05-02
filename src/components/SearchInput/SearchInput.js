import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apikey } from "../../config/Key";
import { SearchBtn } from "../../contexts/SearchBtn";
import "./styles.css";

export default function SearchInput() {
  const { setSearchMovies, searchMovies } = useContext(SearchBtn);
  const image_path = "https://image.tmdb.org/t/p/w500";
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=pt-BR&query=${searchMovies}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results);
      });
  }, [searchMovies]);

  try {
    return (
      <form>
        <input
          placeholder="Pesquisar..."
          onChange={(e) => setSearchMovies(e.target.value)}
        />
        {movie.map((item) => {
          const { id, title, overview, release_date, poster_path } = item;

          return (
            <ul key={id}>
              <Link to={`/details/movie/${id}`}>
                <img src={`${image_path}${poster_path}`} alt={title} />
              </Link>
              <div className="movie-overview">
                <h2>{title}</h2>
                <span>{release_date}</span>
                <p>{overview}</p>
              </div>
            </ul>
          );
        })}
      </form>
    );
  } catch (e) {
    return alert(
      "Erro ao tentar fazer a busca no site. Por gentileza atualize a página para fazer a busca novamente."
    );
  }
}
