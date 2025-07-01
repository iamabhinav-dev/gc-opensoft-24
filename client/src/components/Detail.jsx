/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "../api/axios";
import navailable from "../assets/notavailable.jpg";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Details({id}) {
    const [movie, setMovie] = useState([]);
    const [favourites, setFavourites] = useState([]);

    const [isFavorite, setIsFavorite] = useState(false);
    
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [sub, setSub] = useState(false);

    useEffect(() => {
        if (auth?.plan === undefined) {
            setSub(true);
        } else if (auth.plan == "free") {
            setSub(true);
        } else {
            setSub(false);
        }
    }, [auth])

    const fetchData = async () => {
        try {
            const result = await axios.post(`/detail`,
                JSON.stringify({
                    id: id,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setMovie(result.data[0]);
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchFavourites = async () => {
        try {
            const result = await axios.post(`/favourites`,
                JSON.stringify({
                    name: auth?.user,
                    password: auth?.pwd
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setFavourites(result.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchFavourites();
    },[auth])

    useEffect(() => {
        window.scrollTo(0, 0);
        if(id === undefined) return;
        if(id === "") return;
        fetchData();
    }, [id])

    useEffect(() => {
        if (favourites?.includes(id)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    },[favourites])

    const timeConvert = (n) => {
        var num = n;
        var hours = num / 60;
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + "h " + rminutes + "m";
    }

    const handleMovie = () => {
        if (sub) {
            navigate("/subscribe");
        } else {
            navigate(`/video/${id}`,{state: {name: movie?.title}});
        }
    }

    const handleFavourites = async () => {
        try {
            await axios.post(`/favourites/modify`,
                JSON.stringify({
                    id: id,
                    name: auth?.user,
                    password: auth?.pwd,
                    poster: movie?.poster,
                    title: movie?.title
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Movie added to favourites");
            fetchFavourites();
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleRemoveFavourites = async () => {
        try {
            await axios.post(`/favourites/modify/delete`,
                JSON.stringify({
                    id: id,
                    name: auth?.user,
                    password: auth?.pwd
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Movie removed from favourites");
            fetchFavourites();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-[#00050D] h-auto min-h-screen w-screen flex justify-start items-start text-white pt-[100px]">
            <div className=" w-[70%] h-auto flex flex-col justify-center px-[50px] gap-3 pt-[100px] mb-[500px]">
                <h1 className="text-5xl font-bold mb-[50px]">{movie?.title}</h1>
                <p className="text-xl font-semibold">{movie?.fullplot}</p>
                <div className="flex justify-start items-center gap-4 text-xl font-semibold">
                    <div className="opacity-60">IMDb {movie?.imdb?.rating}</div>
                    <div className="opacity-60">{timeConvert(movie?.runtime)}</div>
                    <div className="opacity-60">{movie?.year}</div>
                    <div className="bg-slate-700 py-[0.1rem] px-[0.25rem] text-lg rounded-md">{movie?.rated}</div>
                </div>
                <div className="text-xl font-semibold flex justify-start items-center gap-3 underline">
                    {
                    movie?.genres?.map((genre, index) => (
                        <span onClick={()=>{
                            genre = genre.toLowerCase();
                            navigate(`/genre/${genre}`, { state: { genre: genre } });
                        }} className="cursor-pointer" key={index}>{genre} </span>
                    ))
                    }
                </div>
                {sub && <div className="text-xl font-semibold mt-4">Watch with a <span className="text-sky-500">Prime</span> membership</div>}
                <div className="text-xl font-semibold flex justify-start items-center gap-4">
                    <button onClick={handleMovie} className="rounded-md py-4 px-6 bg-white text-black hover:scale-105 duration-200">{!sub?"Watch Now":"Watch with Prime"}</button>
                    <button onClick={()=>{
                        navigate(`/trailer/${id}`);
                    }} className="rounded-md py-4 px-6 bg-[#383D42] hover:bg-white hover:text-black hover:scale-105 duration-200">Watch Trailer</button>
                    { (auth?.user && !isFavorite) && <button onClick={handleFavourites} className="rounded-md py-4 px-6 bg-[#383D42] hover:bg-white hover:text-black hover:scale-105 duration-200">Add to Favourites</button>}
                    { (auth?.user && isFavorite) && <button onClick={handleRemoveFavourites} className="rounded-md py-4 px-6 bg-[#383D42] hover:bg-white hover:text-black hover:scale-105 duration-200">Remove from Favourites</button>}
                </div>
            </div>
            <div className="w-[40%] h-screen flex justify-end items-center absolute z-0 right-0">
                {
                    movie?.poster ? <img className="h-full object-contain fade-overlay" src={movie?.poster} alt={movie?.title} onError={(e)=>{
                        e.target.onerror = null;
                        e.target.src = navailable;
                    }} /> : <img className="h-full object-contain fade-overlay" src={navailable} alt={movie?.title} />
                }
            </div>
        </div>
    )
}

export default Details