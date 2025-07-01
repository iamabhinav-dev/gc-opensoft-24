import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";
import Signin from "./pages/Signin";
import PersistLogin from "./pages/PersistLogin";
import RequireAuth from "./pages/RequireAuth";
import IsSigned from "./pages/IsSigned";
import StoreFront from "./pages/StoreFront";
import Genre from "./pages/Genre";
import Lang from "./pages/Lang";
import Detail from "./pages/Detail";
import VideoPage from "./pages/VideoPage";
import TrailerPage from "./pages/TrailerPage";
import Search from "./pages/Search";
import AdvSearch from "./pages/AdvSearch";
import FavouritesPage from "./pages/FavouritesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<PersistLogin/>}>
        <Route path="/" element={<Layout/>}>
          <Route element={<IsSigned/>}>
            <Route path="signup" element={<Signup/>} />
            <Route path="signin" element={<Signin/>} />
          </Route>
            <Route element={<RequireAuth/>}>
              <Route path="*" element={<NoPage/>} />
            <Route path="/favourites" element={<FavouritesPage/>}/>
            </Route>
            <Route path="storefront" element={<StoreFront/>}/>
            <Route path="genre">
              <Route path=":genre" element={<Genre/>}/>
            </Route>
            <Route path="lang">
              <Route path=":lang" element={<Lang/>}/>
            </Route>
            <Route path="detail">
              <Route path=":id" element={<Detail/>}/>
            </Route>
            <Route index element={<Home/>} />
            <Route path="search/:query" element={<Search/>}/>
            <Route path="advancedsearch/:query" element={<AdvSearch/>}/>
        </Route>
        <Route element={<RequireAuth/>}>
          <Route path="/video/:id" element={<VideoPage/>}/>
        </Route>
        <Route path="trailer/:id" element={<TrailerPage/>}/>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App