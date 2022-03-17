import React from "react";

export default function SearchBar({ changeSearchText, query, filterRef }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search"
        style={{
          width: "1000px",
          height: "30px",
          marginRight: "30px",
          borderRadius: "5px",
          border: "thin solid grey",
        }}
        onChange={(e) => changeSearchText(e)}
        value={query}
      />
      <div style={{ width: "100%" }}>
        <select
          name="filter"
          id="s"
          style={{
            height: "35px",
            background: "#1973E8",
            border: "none",
            borderRadius: "5px",
            color: "white",
            width: "100px",
            cursor: "pointer",
          }}
          ref={filterRef}
        >
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
    </div>
  );
}
