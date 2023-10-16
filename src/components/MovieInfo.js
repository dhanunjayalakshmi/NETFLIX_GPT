import { useNavigate, useParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN_URL, LOGIN_BACKGROUND } from "../utils/constants";
import { useEffect, useState } from "react";

const MovieInfo = () => {
  const { movieId } = useParams();
  const [videoKey, setVideoKey] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);

  const navigate = useNavigate();
  // const movie = useSelector((store) => store?.movies?.movie);
  const movie = JSON.parse(sessionStorage.getItem("movie_data"));

  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );

    const json = await data?.json();
    console.log(json);

    const filteredTrailers = json?.results?.filter(
      (video) => video.type === "Trailer"
    );

    const trailer = filteredTrailers?.length
      ? filteredTrailers[0]
      : json?.results[0];

    setVideoKey(trailer?.key);
  };

  const videoUrl = "https://www.youtube.com/embed/" + videoKey + "?&autoplay=1";

  useEffect(() => {
    getMovieVideo();
  }, []);

  console.log(movieId);

  if (movie === null) {
    navigate("/browse");
  }

  const { title, release_date, overview, vote_average, poster_path } = movie;

  // console.log(movie);

  return (
    <>
      <div className="fixed">
        <img
          className="w-screen h-screen object-cover"
          src={LOGIN_BACKGROUND}
          alt="login-background"
        />
      </div>
      <div className="flex h-screen">
        {playVideo ? (
          <div className="relative h-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2"
              onClick={() => setPlayVideo(false)}
            >
              Back
            </button>
          </div>
        ) : (
          // <div className="mx-10 md:w-[40%] lg:w-[50%] h-[60%] absolute mt-[5%] md:mx-auto left-0 right-0 text-xl text-white bg-black bg-opacity-90 rounded-lg">
          //   <button
          //     className="text-3xl text-red-700 px-6 py-2 my-2"
          //     onClick={() => navigate("/browse")}
          //   >
          //     Home
          //   </button>
          //   <div className="mx-6 flex">
          //     <div className="w-1/3 mb-6">
          //       <img src={IMG_CDN_URL + "w400/" + poster_path} alt="Movie" />
          //     </div>

          //     <div className="w-2/3 ml-[3%]">
          //       <h1 className="text-3xl text-red-700 font-bold">{title}</h1>
          //       <p className="py-2 font-bold text-slate-300 text-2xl">
          //         Overview{" "}
          //       </p>
          //       <p className="py-1 w-[70%] text-xl">{overview}</p>
          //       <p className="py-2 font-bold text-slate-300 text-2xl">
          //         Release Date
          //       </p>
          //       <p className="py-1 text-xl">{release_date}</p>
          //       <p className="py-2 font-bold text-slate-300 text-2xl">Rating</p>
          //       <p className="py-1 text-xl">{vote_average}</p>

          //       {!playVideo && (
          //         <button
          //           className="mx-auto font-semibold my-4 py-4 px-6 bg-red-500 text-white"
          //           onClick={() => setPlayVideo(true)}
          //         >
          //           Play
          //         </button>
          //       )}
          //     </div>
          //   </div>
          // </div>
          <div className="lg:h-[100%] left-0 right-0 absolute text-white bg-black bg-opacity-90 rounded-lg">
            <button
              className="text-xl md:text-2xl text-red-700 px-4 md:px-6 py-2 md:my-2"
              onClick={() => navigate("/browse")}
            >
              Home
            </button>
            <div className="p-4 mx-auto h-auto lg:w-[80%] xl:w-[70%] 2xl:w-[60%] sm:h-[100%] md:h-[90%] lg:h-[100%] xl:h-[70%] 2xl:h-[60%] md:my-[5%] text-base md:text-xl ">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 mb-6">
                  <img
                    className="mx-auto w-[50%] sm:w-[40%] md:w-auto"
                    src={IMG_CDN_URL + "w400/" + poster_path}
                    alt="Movie"
                  />
                </div>

                <div className="w-full md:w-2/3 ml-0 md:ml-[3%]">
                  <h1 className="text-xl md:text-3xl text-red-700 font-bold">
                    {title}
                  </h1>
                  <p className="py-2 font-bold text-slate-300 text-md md:text-2xl">
                    Overview
                  </p>
                  <p className="py-1 text-md md:text-xl">{overview}</p>
                  <p className="py-2 font-bold text-slate-300 text-md md:text-2xl">
                    Release Date
                  </p>
                  <p className="py-1 text-lg md:text-xl">{release_date}</p>
                  <p className="py-2 font-bold text-slate-300 text-md md:text-2xl">
                    Rating
                  </p>
                  <p className="py-1 text-md md:text-xl">{vote_average}</p>

                  {!playVideo && (
                    <button
                      className="mx-auto font-semibold sm:my-2 sm:py-2 my-4 py-4 px-6 bg-red-500 text-white"
                      onClick={() => setPlayVideo(true)}
                    >
                      Play
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieInfo;
