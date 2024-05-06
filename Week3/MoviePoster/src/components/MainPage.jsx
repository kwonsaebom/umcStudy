import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignUp from './SignUp';
import NowPlaying from './NowPlayingPage';
import Popular from './PopularPage';
import TopRated from './TopRatedPage';
import Upcoming from './UpComingPage';
import NotFound from './NotFoundPage';
import MovieDetail from './DetailPage'; 
import Nav from '../Nav';

const Home = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navbar><HomePage /></Navbar>} />
          <Route path="/umc" element={<Navbar><HomePage /></Navbar>} />
          <Route path="/signUp" element={<Navbar><SignUp /></Navbar>} />
          <Route path="/popular" element={<Navbar><Popular /></Navbar>} />
          <Route path="/topRated" element={<Navbar><TopRated /></Navbar>} />
          <Route path="/nowPlaying" element={<Navbar><NowPlaying /></Navbar>} />
          <Route path="/upcoming" element={<Navbar><Upcoming /></Navbar>} />
          <Route path="/movie/:movieId" element={<Navbar><MovieDetail /></Navbar>} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

const Navbar = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Home;
