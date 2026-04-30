import { useState, useEffect, useRef } from "react";
import "./App.css";
function Location({ data, onStatusChange }) {
  const [location, setLocation] = useState(data.location);
  const detailsRef = useRef(null);

  function updateLocation(newLocation) {
    setLocation(newLocation);
    onStatusChange(newLocation);
    detailsRef.current.open = false;
  }

  useEffect(() => {
    fetch(`http://localhost:8080/unit_x/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: location,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }, [location, data]);
  if (!data) return <h1>loading...</h1>;
  return (
    <>
      <details className="dropdown" ref={detailsRef}>
        <summary className="btn m-1">{location}</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li>
            <a onClick={() => updateLocation("Weekend")}>Weekend</a>
          </li>
          <li>
            <a onClick={() => updateLocation("Home")}>Home</a>
          </li>
          <li>
            <a onClick={() => updateLocation("Appointment")}>Appointment</a>
          </li>
          <li>
            <a onClick={() => updateLocation("Leave")}>Leave</a>
          </li>
          <li>
            <a onClick={() => updateLocation("Lunch")}>Lunch</a>
          </li>
          <li>
            <a onClick={() => updateLocation("Other")}>Other</a>
          </li>
        </ul>
      </details>
    </>
  );
}

export default Location;
