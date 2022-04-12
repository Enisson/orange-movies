import { useEffect, useRef, useState } from "react";
import { apikey } from "../../config/Key";
import './styles.css';

import arrow from '../../assets/icons/arrow.png';
import arrowLeft from '../../assets/icons/ArrowLeft.png';


export default function CarouselPopular() {

    const [movieList, setMovieList] = useState([]);
    const carousel = useRef(null);
    const leftArrow = useRef(null);
    const rightArrow = useRef(null);
    const count = useRef(0);

    const image_path = "https://image.tmdb.org/t/p/w500";

    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=pt-BR&page=1`)
        .then(response => response.json())
        .then(data => setMovieList(data.results));


        count.current = 0;    

        if(count.current <= 0) {
            leftArrow.current.style.display = 'none';
        }

    }, [] );

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;   
        
        count.current = count.current -1;
        
        if(count.current <= 0) {
            leftArrow.current.style.display = 'none';
        }

        if(count.current <= 2) {
            rightArrow.current.style.display = 'block';

        }
        console.log(count.current)
    }



    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;

        count.current = count.current +1;


        if(count.current >= 3) {
            rightArrow.current.style.display = 'none';
        }

        if(count.current >= 1) {
            leftArrow.current.style.display = 'block';

        }

        console.log(count.current)

    }

    return(
        <div className="popular-movie-container">      
            <div className="carousel" ref={carousel}>
                {movieList.map( movie => {
                    const {id, title, poster_path, genre_ids, vote_average, release_date} = movie;

                    let moviePop = vote_average;
                    let strMovie = moviePop.toFixed(1);
                    let firstN = strMovie.slice(0,1);
                    let lastN = strMovie.slice(-1);
                    let moviePopularity = `${firstN}.${lastN}`;

                    let className = "movie-popularity"

                    if(moviePopularity <= 5) {
                        className = "movie-less";
                    };
                    if (moviePopularity >= 7) {
                        className = "movie-high";
                    };

                    let date = release_date;
                    let splitStr = date.split("-");
                    let releaseDate = splitStr.slice(0,1);
                    
                    return (                    
                    <div className="item" key={id}>
                        <img src={`${image_path}${poster_path}`} alt={title} />
                        <span className="release">{releaseDate}</span>
                        <span className="genre">{genre_ids}</span>
                        <h2 className="movie-title">{movie.title}</h2>
                        <span className={className}>{moviePopularity}</span>
                        
                    </div>
                    );
                })}
            </div>

            <div className="buttons">
                
                <button ref={count} onClick={handleLeftClick} className="arrow-left">
                    <img ref={leftArrow}  src={arrowLeft} alt="arrow icon" />
                </button>
                <button ref={count}  onClick={handleRightClick} className="arrow-right">
                    <img ref={rightArrow}  src={arrow} alt="arrow icon" />
                </button>                
            </div>
        </div>
    );
}