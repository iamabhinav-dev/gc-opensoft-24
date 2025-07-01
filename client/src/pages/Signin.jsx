import { useRef, useState, useEffect } from "react"
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "../api/axios";
const LOGIN_URL = "/user/signin";

function Signin() {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({
          name: user,
          password: pwd
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      const accessToken = response?.data?.access_token;
      const email = response?.data?.email;
      const plan = response?.data?.plan;
      const favourites = response?.data?.favourites;
      const recentSearches = response?.data?.recentSearches;
      if (accessToken) {
        setAuth({ user, pwd, accessToken, email, plan, favourites, recentSearches});
      }
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No response from server');
      }
      else if (err.response?.status === 400) {
        setErrMsg('Invalid username or password');
      }
      else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      }
      else {
        setErrMsg('Login Failed');
      }
    }
  }

  const togglePersist = () => {
    setPersist(!persist);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  },[persist])

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#00050D] text-white">
      <section className="w-max flex flex-col justify-center items-center pt-4 bg-slate-700 rounded-md">
        <p ref={errRef}>{errMsg}</p>
        <h1>Sign In</h1>
        <form className="flex flex-col w-[300px]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            value={user}
            required
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            className="text-black"
          />
          <label htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={pwd}
            required
            onChange={(e) => setPwd(e.target.value)}
            className="text-black"
          />
          <button className="bg-[orangered] hover:bg-[#ff5f25] my-4 p-2 rounded-md">Sign In</button>
          <div>
            <input 
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Trust this device</label>
          </div>
        </form>
        <p className="m-4 w-[300px]">
          Need an account?<br />
          <span className=" font-bold text-blue-500 hover:text-blue-400 duration-200">
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>
      </section>
    </div>
  )
}

export default Signin