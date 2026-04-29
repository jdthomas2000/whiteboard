import { useState, useEffect } from "react";
import "./App.css";
import Here from "./Here";
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
      <div className="headers">
        <h3>Member</h3>
        <h3>In Office?</h3>
        <h3>Out of Office Location</h3>
      </div>
      {person.map((data) => (
        <div key={data.id} className="member">
          <div>{data.name}</div>
          <div>
            <Here
              data={data}
              onStatusChange={(newStatus) => {
                setPerson((prev) =>
                  prev.map((p) =>
                    p.id === data.id ? { ...p, here: newStatus } : p,
                  ),
                );
              }}
            />
          </div>

          {data.here ? (
            <div className="greyed">
              <p>{data.location ? data.location : "N/A"}</p>
            </div>
          ) : (
            <div className="changeable">
              <p>{data.location ? data.location : "N/A"}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default App;
