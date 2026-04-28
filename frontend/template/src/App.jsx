import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [names, setNames] = useState(null);

  fetch("http://localhost:8080/movies")
    .then((res) => res.json())
    .then((data) => setNames(data));

  if (!name) return <h1>loading...</h1>;
  return (
    <>
      {names.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  );
}

export default App;
