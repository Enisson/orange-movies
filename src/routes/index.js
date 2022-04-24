
import { Routes, Route } from "react-router-dom";
import Details from "../pages/Details";
import DetailsTv from "../pages/Details/tv";


import Home from "../pages/Home";


export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/movie/:id" element={<Details />} />
            <Route path="/details/tv/:id" element={<DetailsTv />} />
        </Routes>
    );
}