import { useState, useEffect, useRef } from "react";
import "./App.css";
function Here({ data, onStatusChange }) {
  const [status, setStatus] = useState(data.here);
  const mounted = useRef(false);

  function updateStatus() {
    const newStatus = !status;
    setStatus(newStatus);
    onStatusChange(newStatus);
  }

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    fetch(`http://localhost:8080/unit_x/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        here: status,
      }),
    })
      .then((res) => res.json())

      .catch((err) => console.error(err));
  }, [status]);
  if (!data) return <h1>loading...</h1>;
  return (
    <>
      <button
        onClick={() => updateStatus(status)}
        className="btn btn-soft btn-accent"
      >
        {status ? "Yes" : "No"}
      </button>
    </>
  );
}

export default Here;
