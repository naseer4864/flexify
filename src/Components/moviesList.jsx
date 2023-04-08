import React, { useState, useEffect, Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeBanner from "./Banner";



function MovieList() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [indianMovies, setIndianMovies] = useState([]);
  const [chineseMovies, setChineseMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);

  useEffect(() => {
    const API_KEY = "f7a7c7a6b9099c9838bf9c622a5e3b62";

    // Trending movies
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setTrendingMovies(data.results));

    // Top rated movies
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setTopRatedMovies(data.results));

    //  Upcoming movies
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setUpcomingMovies(data.results));

    // TV series
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setTvSeries(data.results));

      // Fetch Indian movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=hi-IN&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=hi`)
    .then(response => response.json())
    .then(data => setIndianMovies(data.results));

  // Fetch Chinese movies
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=zh-CN&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=zh`)
    .then(response => response.json())
    .then(data => setChineseMovies(data.results));
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Fragment>
      <HomeBanner/>
    <div className="movie-list-container">
      <div className="movie-section">
        <h1>Trending Movies</h1>
        <Slider {...settings}>
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="movie">
              
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
                />
              <div className="movie-info">
              <div className="overview">
              <h3>{movie.title}</h3> 
              <p>{movie.overview}</p>
              </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="movie-section">
        <h1>Top Rated Movies</h1>
        <Slider {...settings}>
          {topRatedMovies.map((movie) => (
            <div key={movie.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
                />
              <div className="movie-info">
              <div className="overview">
              <h3>{movie.title}</h3> 
              <p>{movie.overview}</p>
              </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="movie-section">
        <h1>Upcoming Movies</h1>
        <Slider {...settings}>
          {upcomingMovies.map((movie) => (
            <div key={movie.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
                />
              <div className="movie-info">
              <div className="overview">
              <h3>{movie.title}</h3> 
              <p>{movie.overview}</p>
              </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="movie-section">
        <h1>Indian Movies</h1>
        <Slider {...settings}>
          {indianMovies.map((movie) => (
            <div key={movie.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
                />
              <div className="movie-info">
              <div className="overview">
              <h3>{movie.title}</h3> 
              <p>{movie.overview}</p>
              </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="movie-section">
        <h1>Chinese Movies</h1>
        <Slider {...settings}>
          {chineseMovies.map((movie) => (
            <div key={movie.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
                />
              <div className="movie-info">
              <div className="overview">
              <h3>{movie.title}</h3> 
              <p>{movie.overview}</p>
              </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="movie-section">
        <h1>TV Series</h1>
        <Slider {...settings}>
          {tvSeries.map((series) => (
            <div key={series.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w185${series.poster_path}`}
                alt={series.name}
                />
              <div className="movie-info">
              <div className="overview">
              <h3>{series.title}</h3> 
              <p>{series.overview}</p>
              </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
          </Fragment>
  );
}

export default MovieList;
