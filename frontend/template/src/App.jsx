import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Backend not ready:", err));
  }, []);
  if (!movies) return <h1>loading...</h1>;
  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.name}</div>
      ))}
    </>
  );
}

export default App;
