/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import useLogout from "../hooks/useLogout";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import usericon from "../assets/user.png";
import searchicon from "../assets/searchicon.png";
import axios from "../api/axios";

function Navbar() {
    const logout = useLogout();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const inputRef = useRef();

    const [categoriesGenre, setCategoriesGenre] = useState([]);
    const [categoriesLang, setCategoriesLang] = useState([]);
    const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchMenuOpen, setSearchMenuOpen] = useState(false);
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [EnhancedSearch, setEnhancedSearch] = useState(false);

    const [autoData, setAutoData] = useState([]);

    const [Search, setSearch] = useState("");

    const [sub, setSub] = useState(false);

    const [xfactor, setXfactor] = useState(false);

    useEffect(() => {
        if (autoData.length === 0) {
            setSuggestionsOpen(false);
            return;
        }
        setSuggestionsOpen(true);
    }, [autoData])

    useEffect(() => {
        if (auth?.plan === undefined) {
            setSub(true);
        } else if (auth.plan == "free") {
            setSub(true);
        } else {
            setSub(false);
        }
        if (auth == null) {
            setXfactor(false);
        }
    }, [auth])

    const fetchData = async () => {
        try {
            const result = await axios.post(`/search/auto`,
                JSON.stringify({
                    query: Search,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setAutoData(result.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        var x;
        if (Search.length === 0) {
            setAutoData([]);
            setSuggestionsOpen(false);
            x = setTimeout(() => {
                setAutoData([]);
            }, [100])
            return;
        }
        fetchData();
        return () => {
            clearTimeout(x);
        }
    }, [Search])

    document.addEventListener("click", () => {
        setCategoriesMenuOpen(false);
    })

    document.addEventListener("click", () => {
        setUserMenuOpen(false);
    })

    document.addEventListener("click", () => {
        setSearchMenuOpen(false);
    })

    useEffect(() => {
        setCategoriesGenre(["History", "Mystery", "Horror", "Romance", "Action", "Sport", "News", "Music", "Animation", "Fantasy", "Western", "Biography", "Adventure", "Family", "Musical", "Comedy", "Sci-Fi", "War", "Documentary", "Short", "Thriller", "Drama", "Crime"].sort());
        setCategoriesLang(["Hindi", "English"]);
        const x = setTimeout(() => {
            setXfactor(true);
        }, [1000])
        return () => {
            clearTimeout(x);
        }
    }, [])

    useEffect(() => {
        if (searchMenuOpen) {
            inputRef.current.focus();
        }
    }, [searchMenuOpen])

    const handleCategoriesGenre = (category) => {
        category.genre = category.genre.toLowerCase();
        navigate(`/genre/${category.genre}`, { state: category });
        setCategoriesMenuOpen(false);
    }

    const handleCategoriesLang = (category) => {
        category.lang = category?.lang?.toLowerCase();
        console.log(category);
        navigate(`/lang/${category.lang}`, { state: category });
        setCategoriesMenuOpen(false);
    }

    const handleSubmit = (search) => {
        if (search.length > 0) {
            if(EnhancedSearch){
                navigate(`/advancedsearch/${search}`);
            }
            else{
                navigate(`/search/${search}`);
            }
        }
        setSearchMenuOpen(false);
    }

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className="w-full flex justify-center items-start text-xl font-semibold pt-2 absolute top-0 z-[1000]">
            <div className="flex justify-around items-center bg-[#00050D] text-white w-max gap-4">
                <Logo />
                <button onClick={() => {
                    navigate("/storefront")
                }} className="hover:bg-[#191E25] h-full p-4 min-w-max ">All Movies</button>
                {auth?.user && <button onClick={() => {
                    navigate("/favourites")
                }} className="hover:bg-[#191E25] h-full p-4 min-w-max ">Favourites</button>}
                <button onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(false);
                    setSearchMenuOpen(false);
                    setCategoriesMenuOpen(!categoriesMenuOpen);
                }} className={`hover:bg-[#191E25] ${categoriesMenuOpen ? "bg-[#191E25]" : ""} p-4 duration-200 relative h-full z-[1000]`}>
                    Categories
                    {categoriesMenuOpen && <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }} className="absolute bottom-0 left-0 translate-y-[calc(100%)] bg-[#191E25] w-[800px] pb-5 pt-8 flex justify-center gap-4 px-16 h-max rounded-sm translate-x-[calc(-50%+50px)]">
                        <div className="w-full flex flex-col justify-start items-start">
                            <h1 className="text-xl mb-2 flex justify-start items-center">Genres</h1>
                            <div className="flex flex-col justify-start items-start flex-wrap w-full h-[420px]">
                                {categoriesGenre.map((category, index) => {
                                    return <div key={index} onClick={(e) => {
                                        e.stopPropagation();
                                        handleCategoriesGenre({ "genre": category });
                                    }} className="p-2 hover:bg-white flex justify-start items-center rounded-lg duration-200 text-[#ffffffa8] hover:text-black">{category}</div>
                                })}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl mb-2 flex justify-start items-center">Languages</h1>
                            {categoriesLang.map((category, index) => {
                                return <div key={index} onClick={(e) => {
                                    e.stopPropagation();
                                    handleCategoriesLang({ "lang": category });
                                }} className="p-2 hover:bg-white flex justify-start items-center rounded-lg text-[#ffffffa8] duration-200 hover:text-black">{category}</div>
                            })}
                        </div>
                    </div>}
                </button>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(false);
                    setCategoriesMenuOpen(false);
                    setSearchMenuOpen(!searchMenuOpen);
                    setAutoData([]);
                    setSearch("");
                }} className={`h-full p-[0.90rem] gap-3 relative flex justify-center items-center cursor-pointer hover:bg-[#191E25] ${searchMenuOpen ? "bg-[#191E25]" : ""}`}>
                    <img src={searchicon} className={`min-h-[20px] max-h-[30px] object-contain cursor-pointer`} />
                    {searchMenuOpen &&
                        <div className={`absolute bottom-0 translate-y-[100%] ${!sub ? "translate-x-[-16%]" : "translate-x-[-6%]"} rounded-md w-[60vw] bg-[#191E25] flex flex-col justify-center items-start z-[1000] cursor-default`}>
                            <div onClick={(e) => {
                                e.stopPropagation();
                            }} className={` rounded-md w-full h-[114px] p-6 pb-10 bg-[#191E25] flex justify-center items-center relative`}>
                                <div className="w-full h-full bg-[#33373D] flex flex-col">
                                    <div className={`w-full h-full bg-[#33373D] flex rounded-md border-[3px]`}>
                                        <div className="h-full w-max py-2 pl-3 pr-1">
                                            <img className="h-full" src={searchicon} />
                                        </div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit(Search);
                                        }} className="w-full">
                                            <input ref={inputRef} type="text" value={Search} placeholder="Search" onChange={(e) => {
                                                setSearch(e.target.value);
                                            }} className="w-full focus-within:outline-none h-full p-4 bg-[#33373D] text-white rounded-md" />
                                        </form>
                                    </div>
                                </div>
                                <div className="w-full h-[40px] px-6 flex justify-start items-center gap-3 absolute bottom-0">
                                    <input onChange={(e)=>{
                                        setEnhancedSearch(e.target.checked);
                                    }} checked={EnhancedSearch} type="checkbox" id="checkai" className="hidden"/>
                                    <label id="aibutton" htmlFor="checkai"></label>
                                    <span className="text-sm font-semibold text-[#ffffffd5]">Enhanced Search</span>
                                </div>
                            </div>
                            {suggestionsOpen && <div className="bg-[#191E25] w-full px-6 pb-6">
                                {autoData.map((data, index) => {
                                    return <div key={index} onClick={() => {
                                        setSearch(data.title);
                                        navigate(`/detail/${data.id}`);
                                    }} className="p-3 cursor-pointer text-[#ffffffd5] hover:text-black hover:bg-white rounded-md">{data.title}</div>
                                })}
                            </div>}
                        </div>
                    }
                </div>
                {(xfactor && sub) && <button className="hover:bg-[#191E25] h-full p-4 min-w-max ">Subscribe Now</button>}
                <div onClick={(e) => {
                    e.stopPropagation();
                    setCategoriesMenuOpen(false);
                    setSearchMenuOpen(false);
                    setUserMenuOpen(!userMenuOpen);
                }} className={`h-full p-2 gap-3 relative flex justify-center items-center cursor-pointer hover:bg-[#191E25] ${userMenuOpen ? "bg-[#191E25]" : ""}`}>
                    {auth?.user}
                    <img src={usericon} className={`min-h-[30px] max-h-[40px] object-contain`} />
                    {userMenuOpen && <div className="absolute bottom-0 left-0 translate-y-[calc(100%)] bg-[#191E25] flex flex-col justify-center h-max rounded-sm w-[150px] max-w-[200px]">
                        {auth?.user && <button className="hover:bg-[#2b323c] h-full p-4 w-full flex justify-start items-center" onClick={() => {
                            handleLogout();
                        }}>Logout</button>}
                        {!auth?.user && <button className="hover:bg-[#2b323c] h-full p-4 w-full flex justify-start items-center" onClick={() => {
                            navigate("/signin");
                        }}>Sign-in</button>}
                        <button className="hover:bg-[#2b323c] h-full p-4 w-full flex justify-start items-center">Settings</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar