import { useSelector } from "react-redux";
import useMovieTrailer from "../customHooks/useMovieTrailerVideo";

const VideoBackground = ({ id }) => {
  const dataFromTrailer = useSelector((store) => store.movies?.movieTrailer);

  useMovieTrailer(id);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          dataFromTrailer?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
