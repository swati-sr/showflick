import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTrailer } from "../utils/moviesSlice";

const useMovieTrailer = (id) => {
  const getTrailer = useSelector((store) => store.movies?.movieTrailer);
  const dispatch = useDispatch();

  const getMovieTrailerVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?`,
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addMovieTrailer(trailer));
  };

  useEffect(() => {
    !getTrailer && getMovieTrailerVideo();
  }, []);
};

export default useMovieTrailer;
