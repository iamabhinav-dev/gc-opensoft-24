
import React, { useState } from "react";
import useAuth from "../hooks/useAuth"
import {Link} from "react-router-dom";
function Home() {
  const { auth } = useAuth();
  const [sub,setSub] = useState(false);

  React.useEffect(()=>{
    if(auth?.user == undefined){
      setSub(false);
    }
    else if(auth?.plan === undefined){
      setSub(true);
    } else if(auth?.plan == "free"){
      setSub(true);
    } else {
      setSub(false);
    }
  },[auth])

  return (
    <section className="w-screen h-screen bg-[#00050D] text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Welcome to Movix Prime</h1>
      <br/>
      <p>Watch your favorite movies and TV shows</p>
      <br/>
      <br/>
      {sub && <button className="bg-blue-900 hover:bg-blue-800 p-2 mb-6">Subscribe Now</button>}
      {!auth?.user && <p>Already have an account? <Link to="/signin" className="text-blue-500 hover:text-blue-400 duration-200 font-bold">Login</Link></p>}
    </section>
  )
}

export default Home