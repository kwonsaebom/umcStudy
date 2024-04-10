import MovieList from './components/MovieList'
import moviesData from './assets/movies'; 
import './App.css';


const App = () => {
  return (
    <div>
      <MovieList movies={moviesData} /> {/* moviesData를 props로 전달합니다. */}
    </div>
  );
};

export default App;
