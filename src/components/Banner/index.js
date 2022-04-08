import { useEffect, useState } from 'react';
import { apikey } from '../../config/Key';
import './styles.css';

export default function Banner() {

    const [movieList, setMovieList] = useState([]);
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true)
    
    const image_path = "https://image.tmdb.org/t/p/w500";


    useEffect( ()=> {
        const fetchData = async () => {
            await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=pt-BR&page=1`)
            .then(Response => Response.json())
            .then(data => setMovieList(data.results))
        }
        fetchData();
        setLoading(false);

    }, [] )

    useEffect( () => {
        const callMovie = async () => {
            const randomMovie = await movieList[Math.floor(Math.random() * movieList.length)];

            const pickMovie = {
                title: randomMovie.title,
                sinopse: randomMovie.overview,
                image: `${image_path}${randomMovie.poster_path}`,
                release: randomMovie.release_date
            }
            setMovie(pickMovie);
        }

        
        callMovie();
    }, [movieList] )
    

    if(!loading) {

        return (
            <div className='banner-container'>
                <div className='img-container'>
                    <img src={movie.image} alt={movie.title} />
                </div>
    
                <div className='banner-content'>
                    <h1>{movie.title}</h1>
                    <h2>{movie.sinopse ? movie.sinopse : <p>Humm... Parece que estamos sem a legenda deste filme no momento :/</p>}</h2>
                    <span>{movie.release}</span>
                </div>
            </div>
        );
    }
}