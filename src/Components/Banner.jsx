import { useState, useEffect, Fragment} from "react";
import { Outlet } from "react-router-dom";

const HomeBanner = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const API_KEY = "f7a7c7a6b9099c9838bf9c622a5e3b62";
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setTrendingMovies(data.results));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex(currentIndex => (currentIndex + 1) % trendingMovies.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [trendingMovies]);

  const currentMovie = trendingMovies[currentMovieIndex];

  return (
    <Fragment>
    <div className="banner">
      <img id="banner-img" src={`https://image.tmdb.org/t/p/original/${currentMovie?.backdrop_path}`} alt={currentMovie?.title} />
      <div className="banner-info">
        <h2>{currentMovie?.title}</h2>
        <div className="banner-btn">
          <button>Play</button>
          <button>Watch Later</button>
        </div>
        <h4>Released: {currentMovie?.release_date}</h4>
        <div className="banner-overview">
        <p>{currentMovie?.overview}</p>
        </div>
      </div>
    </div>
    <Outlet/>
    </Fragment>
  );
}

 
export default HomeBanner;