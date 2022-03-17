import React from "react";

export default function Button({ onClick, title }) {
  return (
    <div style={{ width: "100%" }}>
      <button
        style={{
          padding: "10px 30px",
          background: "#1973E8",
          border: "0",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={onClick}
        type="submit"
      >
        {title}
      </button>
    </div>
  );
}
