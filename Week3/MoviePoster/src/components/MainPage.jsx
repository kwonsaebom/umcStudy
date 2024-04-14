import HomePage from './HomePage';
import NowPlaying from './NowPlayingPage';
import Popular from './PopularPage';
import TopRated from './TopRatedPage';
import Upcoming from './UpComing';
import Nav from '../Nav';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = () => {
  return (
    <BrowserRouter>
      <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/umc" element={<Popular />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/topRated" element={<TopRated />} />
          <Route path="/nowPlaying" element={<NowPlaying />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/signup" element={<Upcoming />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Home;
