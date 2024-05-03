import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

interface MovieData {
  Poster: string;
  Title: string;
  Year: string;
  Released: string;
  Genre: string;
  Director: string;
  Country: string;
  Actors: string;
  Language: string;
  imdbRating: string;
  Plot: string;
  Response?: string;
  Error?: string;
}

const Content: React.FC = () => {
  const apiKey = "e86c761f";
  const [searchValue, setSearchValue] = useState<string>("");
  const [data, setData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!searchValue.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<MovieData>(
        `http://www.omdbapi.com/?t=${searchValue}&apikey=${apiKey}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setSearchValue("");
    }
    console.log(data?.Poster);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  return (
    <div className="h-full min-h-screen bg-slate-800 w-full ">
      <div className="w-full items-center justify-center flex pt-7">
        <input
          type="text"
          placeholder="Search for movies"
          className="text-[19px] mr-4 outline-none rounded-md p-2 w-[50%]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="border border-white rounded-md text-white font-bold p-2"
          onClick={fetchData}
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      ) : data !== null ? (
        data.Response === "False" && data.Error === "Movie not found!" ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-4xl text-white font-bold">
              Movies not found :(
            </h1>
          </div>
        ) : (
          <div className="mt-10 w-full flex items-center justify-center text-white font-bold flex-wrap">
            {data !== null && (
              <div>
                <img
                  src={data.Poster}
                  alt={`${data.Title} Poster`}
                  className="border border-white rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            <div className="ml-5 bg-slate-700 p-2 rounded-md">
              <h1>
                Title: {data?.Title} ({data?.Year})
              </h1>
              <div className="pt-2" />
              <p>Release date: {data?.Released}</p>
              <div className="pt-2" />
              <p>Genre: {data?.Genre}</p>
              <div className="pt-2" />
              <p>Director: {data?.Director}</p>
              <div className="pt-2" />
              <p>Country: {data?.Country}</p>
              <div className="pt-2" />
              <p>Actors: {data?.Actors}</p>
              <div className="pt-2" />
              <p>Language: {data?.Language}</p>
              <div className="pt-2" />
              <p>Rating: {data?.imdbRating}</p>
              <div className="pt-2" />
              <p>Plot: {data?.Plot}</p>
              <div className="pt-2" />
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-4xl text-white font-bold">
            Search for a movie in the input field
          </h1>
        </div>
      )}
    </div>
  );
};

export default Content;
