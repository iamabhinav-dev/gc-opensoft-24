import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "/user/signup";

function Signup() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [isValidMatchPwd, setIsValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setIsValidName(result);
  }, [user])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setIsValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = pwd?.length >= 5 && pwd?.length <= 24;
    setIsValidPwd(result);
    const match = pwd === matchPwd;
    setIsValidMatchPwd(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = pwd?.length >= 5 && pwd?.length <= 24;
    if (!v1 || !v2) {
      setErrMsg("Invalid entry");
      return;
    }
    try{
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({name:user,password:pwd,email:email}),
        {
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true
        }
      );
      console.log(response.data);
      // console.log(response.accessToken);
      setSuccess(true);
    }catch(err){
      if(!err?.response){
        setErrMsg("No Server Response");
      }
      else if(err.response?.status === 409){
        setErrMsg(err.response.data.message);
      }
      else{
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  }

  return (
    <div>
      {success ? (
        <section style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
        }}>
          <h1>Success!</h1>
          <p>Your account has been created.</p>
          <Link to="/signin">Login</Link>
        </section>
      ) : (
        <section className="w-screen h-screen flex flex-col justify-center items-center bg-[#00050D] text-white">
          <p ref={errRef}>{errMsg}</p >
          <h1>Sign-Up</h1>
          <form style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
          }}
            onSubmit={handleSubmit}
          >
            <label htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="text-black"
            />
            {userFocus && !isValidName && <p>4-24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.</p>}

            <label htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              className="text-black"
            />
            {emailFocus && !isValidEmail && <p>Invalid email address.</p>}

            <label htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="text-black"
            />
            {pwdFocus && !isValidPwd && <p>Password must contain 5-24 characters.</p>}

            <label htmlFor="match-password">
              Confirm Password:
            </label>
            <input
              type="password"
              id="match-password"
              autoComplete="off"
              required
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
              className="text-black"
            />
            {matchPwdFocus && !isValidMatchPwd && <p>Passwords must match.</p>}
          
            <button
              disabled={!isValidName || !isValidPwd || !isValidMatchPwd ? true : false}
              style={{
                cursor: !isValidName || !isValidPwd || !isValidMatchPwd ? "not-allowed" : "pointer",
                marginTop: "10px"
              }}
            >
              Sign-Up
            </button>
          </form>
          <p>
            Already have an account?<br />
            <Link onClick={(e)=>{
              e.stopPropagation();
            }} to="/signin">Sign In</Link>
          </p>
        </section >
      )
      }
    </div>
  )
}

export default Signup