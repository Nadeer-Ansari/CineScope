import { BrowserRouter, Routes, Route } from "react-router";
import App from "./components/App";
import Home from "./components/Home";
import Pagenotfound from "./components/Pagenotfound";
import Upcoming from "./components/Upcoming";
import Popular from "./components/Popular";
import Toprated from "./components/Toprated";
import SingleMovie from "./components/SingleMovie";
import SearchMovie from "./components/SearchMovie";
const projectroute = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App></App>}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="popular" element={<Popular />} />
        <Route path="toprated" element={<Toprated />} />
        <Route path="movie/:id" element={<SingleMovie />} />
        <Route path="search" element={<SearchMovie />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default projectroute;
