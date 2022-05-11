
import { Routes, Route, Navigate } from "react-router-dom";
import About from "../pages/About";
import Details from "../pages/Details";
import DetailsTv from "../pages/Details/tv";


import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Tv from "../pages/Tv";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


export default function AllRoutes() {

    const { user, setUser } = useContext(UserContext);

    return (

        <Routes>
            {!user && (<>
                <Route path="/login" element={<Login authentication={()=> setUser(true)}/>} />
                <Route path="/signup" element={<SignUp authentication={()=> setUser(true)}/>} />
            </>)}

            {user && (<>

                <Route path="/dashboard" element={<Dashboard logOut={()=> setUser(false)}/>} />
            
            </>)}
            
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/tv" element={<Tv />} />
            <Route path="/about" element={<About />} />
            <Route path="/details/movie/:id" element={<Details />} />
            <Route path="/details/tv/:id" element={<DetailsTv />} />

            <Route path="*" element={<Navigate to={user ? '/dashboard' : '/signup'}/>}/>
        </Routes>

    );
}