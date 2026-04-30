import { useState, useEffect } from "react";
import "./App.css";
function AddMember() {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function saveUser() {
    fetch("http://localhost:8080/unit_x/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, here: true }),
    })
      .then((res) => res.json())

      .catch((err) => console.error(err));
  }

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Add Member
      </button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Member</h3>

          <label className="input mt-4">
            Name
            <input
              type="text"
              className="grow"
              placeholder="Enter name"
              onChange={handleChange}
            />
          </label>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={saveUser}>
                Save
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default AddMember;
