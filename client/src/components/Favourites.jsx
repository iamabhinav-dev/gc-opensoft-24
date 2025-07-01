/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import navailable from "../assets/notavailable.jpg";
import GSkeleton from "./GSkeleton";
import { useNavigate } from "react-router-dom";

function FullSearch() {
    const [sub, setSub] = useState(false);
    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const { auth } = useAuth();

    const navigate = useNavigate();

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
            const result = await axios.post(`/favourites/all`,
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
            setData(result.data.favourites);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(auth){
            fetchData();
        }
    }, [auth])

    useEffect(() => {
        if (data.length > 0) {
            setLoaded(true);
        }
    },[data])

    if (!isLoaded) return (
    <div>
        <GSkeleton/>
    </div>
    )

    return (
        <div className="flex flex-col justify-start items-start mt-7 mb-10 mx-10 pt-[30px]">
            <div className="flex items-center gap-7 text-4xl mb-8">
                {sub && <span className="font-bold text-[#1A98FF]">Prime</span>}
                <span className="font-bold">Favourite Movies and Shows</span>
            </div>
            <div className="flex justify-start items-center gap-8 relative flex-wrap pl-[30px]">
                {
                    data.map((movie, index) => {
                        if (!(movie?.poster)) return (
                            <div onClick={()=>{
                                navigate(`/detail/${movie.id}`)
                            }} className="h-full w-[200px] cursor-pointer shadow-lg relative z-0 flex justify-center items-center hover:scale-105 duration-200" key={index}>
                                <img src={navailable} alt={movie.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = navailable;
                                    }}
                                className="h-[300px] object-fill w-full rounded-lg" />
                                <h3 className="font-semibold absolute bottom-0 left-0 translate-x-2 -translate-y-2 z-10 bg-slate-900 mr-4 p-2 opacity-85 rounded-lg">{movie.title}</h3>
                            </div>
                        )
                        return (
                            <div onClick={()=>{
                                navigate(`/detail/${movie.id}`)
                            }} className="h-full w-[200px] cursor-pointer shadow-lg relative z-0 flex justify-center items-center hover:scale-105 duration-200" key={index}>
                                <img src={movie.poster} alt={movie.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = navailable;
                                    }}
                                className="h-[300px] object-fill w-full rounded-lg" />
                                <h3 className="font-semibold absolute bottom-0 left-0 translate-x-2 -translate-y-2 z-10 bg-slate-900 mr-4 p-2 opacity-85 rounded-lg">{movie.title}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FullSearch