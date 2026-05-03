import { Routes, Route } from "react-router";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Pagenotfound from "./Pagenotfound";
import Upcoming from "./Upcoming";
import Popular from "./Popular";
import Toprated from "./Toprated";
import SingleMovie from "./SingleMovie";
import SearchMovie from "./SearchMovie";
import { ThemeProvider } from "../context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main style={{ paddingTop: "20px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Pagenotfound />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="popular" element={<Popular />} />
          <Route path="toprated" element={<Toprated />} />
          <Route path="movie/:id" element={<SingleMovie />} />
          <Route path="search" element={<SearchMovie />} />
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;