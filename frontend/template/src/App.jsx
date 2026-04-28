import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [person, setPerson] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/unit_x")
      .then((res) => res.json())
      .then((data) => setPerson(data))
      .catch((err) => console.error("Backend not ready:", err));
  }, []);
  if (!person) return <h1>loading...</h1>;
  return (
    <>
      {person.map((data) => (
        <>
          <div key={data.id}>
            {data.name} {data.status}
          </div>
          <div>test2</div>
        </>
      ))}
    </>
  );
}

export default App;
