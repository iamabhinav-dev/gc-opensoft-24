/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';
import navailable from "../assets/notavailable.jpg";
import SliderSkeleton from "./SliderSkeleton";
import rightArrow from "../assets/right.png";
import leftArrow from "../assets/left.png";

function SliderGenre({ genre }) {
  const [sub, setSub] = useState(false);
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const scrollRef = useRef();

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
      const result = await axios.post(`/genre`,
        JSON.stringify({
          genre: genre,
          lim: 20
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setData(result.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setLoaded(true);
    }
  }, [data]);

  if (!isLoaded) return (
    <div>
      <SliderSkeleton />
    </div>
  )

  return (
    <div className="flex flex-col justify-center mt-14 px-6">
      <div className="flex items-center gap-7 text-2xl mb-4">
        {sub && <span className="font-bold text-[#1A98FF]">Prime</span>}
        <span className="font-bold">{genre} movies</span>
        <button onClick={() => {
          genre = genre.toLowerCase();
          navigate(`/genre/${genre}`, { state: { genre: genre } });
        }}>See More</button>
      </div>
      <div className="flex justify-center items-center relative">
        <div className="h-full absolute left-0 z-10 w-5 flex justify-center items-center gray-overlay opacity-0 hover:opacity-100 duration-100">
          <button onClick={() => {
            scrollRef.current.scrollLeft -= 500;
          }} className="h-full w-max">
            <img
              src={leftArrow}
              alt="left"
              className="h-5 cursor-pointer" 
            />
          </button>
        </div>
        <div ref={scrollRef} id="sccomp" className=" flex justify-start items-start w-full gap-7 mt-6 scroll-smooth overflow-x-scroll">
          {data.map((movie, index) => {
            if (!movie?.poster) {
              return (
                <div onClick={()=>{
                  navigate(`/detail/${movie._id}`)
                }} className="h-full min-w-max cursor-pointer shadow-lg relative z-0 flex justify-center items-center" key={index}>
                  <img src={navailable} alt={movie.title} className="h-[300px] object-cover w-full rounded-lg" />
                  <h3 className="font-semibold absolute bottom-0 left-0 translate-x-2 -translate-y-2 z-10 bg-slate-900 mr-4 p-2 opacity-85 rounded-lg">{movie.title}</h3>
                </div>
              )
            }
            return (
              <div onClick={()=>{
                navigate(`/detail/${movie._id}`)
              }} className="h-full min-w-max cursor-pointer shadow-lg relative z-0 flex justify-center items-center" key={index}>
                <img src={movie.poster} alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = navailable;
                  }}
                  className="h-[300px] object-cover w-full rounded-lg" />
                <h3 className="font-semibold absolute bottom-0 left-0 translate-x-2 -translate-y-2 z-10 bg-slate-900 mr-4 p-2 opacity-85 rounded-lg">{movie.title}</h3>
              </div>
            )
          })}
        </div>
        <div className="h-full absolute right-0 z-10 w-5 flex justify-center items-center gray-overlay opacity-0 hover:opacity-100 duration-100">
          <button onClick={() => {
            scrollRef.current.scrollLeft += 500;
          }} className="h-full w-max">
            <img
              src={rightArrow}
              alt="right"
              className="h-5 cursor-pointer" 
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SliderGenre