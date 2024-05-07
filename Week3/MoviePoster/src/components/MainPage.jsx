import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "./SignUpPage";
import NowPlaying from "./NowPlayingPage";
import Popular from "./PopularPage";
import TopRated from "./TopRatedPage";
import Upcoming from "./UpComingPage";
import NotFound from "./NotFoundPage";
import MovieDetail from "./DetailPage";
import Login from "./LoginPage";

import Nav from "../Nav";

const Home = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/umc" element={<HomePage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/topRated" element={<TopRated />} />
          <Route path="/nowPlaying" element={<NowPlaying />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
