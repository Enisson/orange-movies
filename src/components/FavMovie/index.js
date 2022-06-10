import { useContext, useEffect, useState } from "react";
import { apikey } from "../../config/Key";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

import "./styles.css";

export default function FavMovie({ id }) {
  const [movie, setMovie] = useState();
  const [releaseDateMonth, setReleaseDateMonth] = useState();
  const [releaseDateDay, setReleaseDateDay] = useState();
  const [releaseDateY, setReleaseDateY] = useState();

  const { month, loading } = useContext(UserContext);

  const image_path = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=pt-BR`
    )
      .then((res) => res.json())
      .then((data) => {
        const { poster_path, title, overview, release_date, vote_average } = data;

        const movie = {
          title,
          overview,
          image: `${image_path}${poster_path}`,
          releaseDate: release_date,
          voteAverage: vote_average,
        };
        setMovie(movie);

        let release = movie.releaseDate;
        let splitStr = release.split("-");
        let replaceStr = splitStr.reverse();
                
        setReleaseDateMonth(splitStr[1].slice(1));
        setReleaseDateDay(splitStr[0])
        setReleaseDateY(splitStr[2]);
        
      });
      
  }, [id]);

 
  
  let className = "movie-popularity"
  
  const moviePop = () => {

    let movieAve = movie.voteAverage;

    if(movieAve <= 5) {
        className = "movie-less";
    };
    if (movieAve >= 7) {
        className = "movie-high";
    };

    return className
}
if(movie !== undefined){

  return (
  <Link to={`/details/movie/${id}`} className="favmovie-container">
    <div className="img-container">
    <img src={movie.image} alt={movie.title} />
  </div>
  <div className="favmovie-content">
    <h1>{movie.title}</h1>
    <div className="span-info">
        <span>{`${releaseDateDay} de ${month[releaseDateMonth]} de ${releaseDateY}`}</span>
        <span  className={moviePop()}>{movie.voteAverage}</span>
    </div>
    <p>{movie.overview}</p>
  </div>
  </Link>
  );
}
 
}
  