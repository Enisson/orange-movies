import { useEffect, useState } from "react";
import { apikey } from "../../config/Key";

import './styles.css';
import play from '../../assets/icons/play.svg';


export default function Trailers({id, img, name, sinopse}) {

    // const [movieList, setMovieList] = useState([]);
    const [trailers, setTrailers] = useState({});
    const [click, setClick] = useState(false);

    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=en-US`)
        .then(res => res.json())
        .then(data => {
            setTrailers(data.results)
        })

    }, [id]);


    const isClicked = () => {
        if(!click){
            setClick(true);
        } else {
            setClick(false);
        }
    };

    return (
        <div className="trailers-content">

                <span onClick={isClicked} className="video-content">
                    {click ? <iframe className="video"  src={`https://www.youtube.com/embed/${trailers[0].key}?autoplay=1`} allow='autoplay' title="YouTube video player"></iframe> : <img src={img} className="thumbnail" alt={name} />}
                    {click && <button onClick={isClicked}></button> }
                    <span className="play">
                        <img src={play} alt="play" />
                    </span>
                </span>
                <div className="movie-content">
                    <h4>{name}</h4>
                    <p>{sinopse}</p>
                </div>  
        </div>
    );
}