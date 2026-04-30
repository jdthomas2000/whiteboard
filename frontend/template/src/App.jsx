import { useState, useEffect } from "react";
import "./App.css";
import Here from "./Here";
import Location from "./Location";
import AddMember from "./AddMember";
import Delete from "./Delete";
function App() {
  const [person, setPerson] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/unit_x")
      .then((res) => res.json())
      .then((data) => setPerson(data))
      .catch((err) => console.error("Backend not ready:", err));
  }, []);
  if (!person) return <h1>loading...</h1>;
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <a className="btn btn-ghost text-xl">Unit X Status Tracker</a>
      </div>

      <div className="table-wrapper">
        <div className="headers">
          <h3>Member</h3>
          <h3>In Office?</h3>
          <h3>Out of Office Location</h3>
        </div>
        {person.map((data) => (
          <div key={data.id} className="member">
            <div className="member-row">
              {data.name}

              <Delete
                data={data}
                onMemberDeleted={(deletedMember) => {
                  setPerson((prev) =>
                    prev.filter((p) => p.id !== deletedMember.id),
                  );
                }}
              />
            </div>

            <div>
              <Here
                data={data}
                onStatusChange={(newStatus) => {
                  setPerson((prev) =>
                    prev.map((p) =>
                      p.id === data.id
                        ? {
                            ...p,
                            here: newStatus,
                            location: newStatus ? null : p.location,
                          }
                        : p,
                    ),
                  );
                }}
              />
            </div>

            {data.here ? (
              <div className="greyed">
                <p>N/A</p>
              </div>
            ) : (
              <div className="changeable">
                <Location
                  data={data}
                  onStatusChange={(newLocation) => {
                    setPerson((prev) =>
                      prev.map((p) =>
                        p.id === data.id ? { ...p, location: newLocation } : p,
                      ),
                    );
                  }}
                />
              </div>
            )}
          </div>
        ))}

        <div className="add-member-row">
          <AddMember
            onMemberAdded={(newMember) => {
              setPerson((prev) => [...prev, newMember]);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
