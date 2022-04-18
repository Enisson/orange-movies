import './styles.css';

import TopActors from '../TopActors';
import Trailers from '../Trailers';
import { useEffect, useState } from 'react';
import { apikey } from '../../config/Key';

export default function Newsletter() {

    const [movieList, setMovieList] = useState([]);

    const image_path = "https://image.tmdb.org/t/p/w500";

    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=pt-BR&page=1`)
        .then(response => response.json())
        .then(data => {
            setMovieList(data.results)
        });

    }, []);

    return (
        <div className='newsletter-container'>

            <h1>Notícias</h1>

            <div className='newsletter'>

                <div className='top-actor-actress__container'>

                        <h2>Top atores e atrizes</h2>
                        
                        <TopActors />
                </div>
                <div className='trailers-container'>
                    <h2>Últimos Trailers</h2>


                    <div className='trailers'>

                        

                            {movieList.map( (movie, index) => {

                                const { id, title, overview, backdrop_path } = movie;
                                if (index < 3) 
                                return (   
                                    <div key={id} className="movie">
                                        <Trailers id={id} img={`${image_path}${backdrop_path}`} name={title} sinopse={overview} />  
                                    </div>
                                )
                            } )}
                    </div>
                </div>
            </div>
        </div>
    );
}