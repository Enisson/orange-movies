import { useEffect, useRef, useState } from "react";
import { apikey } from "../../config/Key";

import './styles.css';

import LeftA from '../../assets/icons/ArrowLeft.png';
import RightA from '../../assets/icons/arrow.png';

export default function MovieCast({id}) {

    const [cast, setCast] = useState([]);
    const carousel = useRef(null);
    const leftArrow = useRef(null);
    const rightArrow = useRef(null);
    const count = useRef(0);

    const image_path = "https://image.tmdb.org/t/p/w500";


    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}&language=pt-BR`)
        .then(res => res.json())
        .then(data => {            
            setCast(data.cast);
        })

        count.current = 0;    

        if(count.current <= 0) {
            leftArrow.current.style.display = 'none';
        }
    }, [id] );

    //character
    //name
    //profile_path
    //cast_id

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
    }


    return (
        <>
            <ul className="cast" ref={carousel}>

                {cast.map( item => {

                    return (
                        <li key={item.id}>
                           <img src={`${image_path}${item.profile_path}`} alt={item.name} /> 
                           <span className="name">{item.name}</span>
                           <span className="character">{item.character}</span>
                        </li>
                    )
                })}
            </ul>

            <div className="buttons">
                <button ref={count} onClick={handleLeftClick} className="arrow-left">
                    <img ref={leftArrow} src={LeftA} alt="left arrow" />
                </button>
                <button ref={count} onClick={handleRightClick} className="arrow-right">
                    <img ref={rightArrow} src={RightA} alt="right arrow" />
                </button>
            </div>

        </>
    );
}