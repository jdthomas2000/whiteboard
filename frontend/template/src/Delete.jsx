import { useState, useEffect } from "react";
import "./App.css";
function Delete({ data }) {
  function deleteUser() {
    fetch(`http://localhost:8080/unit_x/${data.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())

      .catch((err) => console.error(err));
  }

  return (
    <>
      <button
        className="btn btn-soft btn-error btn btn-xs"
        onClick={deleteUser}
      >
        Delete
      </button>
    </>
  );
}

export default Delete;
