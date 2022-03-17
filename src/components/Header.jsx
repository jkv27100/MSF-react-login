import React from "react";
import Button from "./Button";
import SearchBar from "./SearchBar";

export default function Header({
  userName,
  query,
  changeSearchText,
  handleLogout,
  filterRef,
  handleSearch,
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      <div style={{ width: "150%" }}>
        <h2>Welcome, {userName}</h2>
      </div>
      <div style={{ width: "40%" }}>
        <SearchBar
          changeSearchText={changeSearchText}
          query={query}
          handleSearch={handleSearch}
          filterRef={filterRef}
        />
      </div>
      <div style={{ width: "100%" }}>
        <Button title="Search" onClick={handleSearch} />
      </div>

      <div style={{ width: "100%" }}>
        <Button title="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
}
