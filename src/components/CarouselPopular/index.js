import { useEffect, useRef, useState } from "react";
import { apikey } from "../../config/Key";
import './styles.css';

import arrow from '../../assets/icons/arrow.png';


export default function CarouselPopular() {

    const [movieList, setMovieList] = useState([]);
    const carousel = useRef(null);

    const image_path = "https://image.tmdb.org/t/p/w500";

    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=pt-BR&page=1`)
        .then(response => response.json())
        .then(data => setMovieList(data.results));

    }, [] );

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
        console.log(carousel.current.scrollLeft)

        
        
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }


    return(
        <div className="popular-container">
            <div className="title-container">
                <div className="title">
                    <h1>Os mais populares</h1>
                    <span>ver mais</span>
                </div>
                <div className="movie-link">
                    <span>Filmes</span>
                    <span>Séries</span>
                </div>
            </div>

            <div className="carousel" ref={carousel}>
                {movieList.map( movie => {
                    const {id, title, poster_path, genre_ids} = movie;
                    
                    return (                    
                    <div className="item" key={id}>
                        <img src={`${image_path}${poster_path}`} alt={title} />
                        <span className="release">ano</span>
                        <span className="genre">{genre_ids}</span>
                        <h2 className="movie-title">{movie.title}</h2>
                    </div>
                    );
                })}
            </div>

            <div className="buttons">
                <button onClick={handleLeftClick} className="arrow-left">
                    <img src={arrow} alt="arrow icon" />
                </button>
                <button onClick={handleRightClick} className="arrow-right">
                    <img src={arrow} alt="arrow icon" />
                </button>
                
            </div>
        </div>
    );
}