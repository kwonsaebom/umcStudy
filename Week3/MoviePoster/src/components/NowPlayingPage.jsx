// components/Popular.js
import Movie from "./Pages";

function nowPlaying() {
  return <Movie endpoint="now_playing" />;
}

export default nowPlaying;
