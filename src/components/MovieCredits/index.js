import { useEffect, useState } from "react";
import { apikey } from "../../config/Key";

export default function MovieCredits({id}) {

    const [crew, setCrew] = useState([]);

    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}&language=pt-BR`)
        .then(res => res.json())
        .then(data => {
            console.log(data.crew)
            setCrew(data.crew)
        })
    }, [] )

    let directors = [];
    let writer = [];
    let story = [];

    crew.forEach( function (entry) {
        if(entry.job === 'Director') {
            directors.push(entry.name);
        }
        if(entry.job === 'Writer') {
            writer.push(entry.name);
        }
        if(entry.job === 'Story') {
            story.push(entry.name);
        }
        
    })

    console.log(writer)

    return (
        <>
            { directors.length !== 0 && (
                <li>
                    <h3>Diretor</h3>
                    <p>{directors[0]}</p>
                </li>
            )}
                
            {writer.length !== 0 && (
                <li>
                    <h3>Escritor</h3>
                    <p>{writer[0]}</p>
                </li>
            )}
            
            {story.length !== 0 && (
                <li>
                    <h3>História</h3>
                    <p>{story[0]}</p>
                </li>

            )}
        </>
    );
}