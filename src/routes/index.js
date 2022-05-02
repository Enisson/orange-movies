
import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Details from "../pages/Details";
import DetailsTv from "../pages/Details/tv";


import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Tv from "../pages/Tv";


export default function AllRoutes() {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/tv" element={<Tv />} />
            <Route path="/about" element={<About />} />
            <Route path="/details/movie/:id" element={<Details />} />
            <Route path="/details/tv/:id" element={<DetailsTv />} />
        </Routes>

    );
}