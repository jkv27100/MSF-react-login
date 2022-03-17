import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import "../css/Home.css";

export default function Home() {
  const users = JSON.parse(localStorage.getItem("users"));
  const [userDetails, setUserDetails] = useState(users);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();
  const filterRef = useRef();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  const handleRowDelete = (id, name) => {
    const response = window.confirm(`are you sure you want to delete ${name}?`);
    if (!response) return null;
    else {
      const result = users.filter((user, index) => index !== id);
      localStorage.setItem("users", JSON.stringify(result));
      setUserDetails(result);
      alert(`${name}deleted!`);
    }
  };

  const handleModal = (row) => {
    setIsOpen(true);
    setSelectedRow(row);
  };

  const changeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const result = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filterRef.current.value === "all") setUserDetails(result);
    else {
      const filtered = result.filter(
        (user) => user.role === filterRef.current.value
      );
      setUserDetails(filtered);
    }
  };

  return (
    <>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          row={selectedRow}
          setUserDetails={setUserDetails}
          isOpen={isOpen}
        />
      )}
      <div
        style={{
          width: "90%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
            }}
          >
            <Header
              userName={state.name}
              handleLogout={handleLogout}
              changeSearchText={changeSearchText}
              filterRef={filterRef}
              query={searchText}
              handleSearch={handleSearch}
            />
          </div>

          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone</th>
                <th>Role</th>
                {state.role === "admin" && <th>Edit</th>}
              </tr>
            </thead>
            <tbody>
              {userDetails.map((user, index) => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  {state.role === "admin" && (
                    <td>
                      <button
                        style={{ marginRight: "5px" }}
                        onClick={() => handleModal(index)}
                      >
                        edit
                      </button>

                      {currentUser.email === user.email ? (
                        <button disabled>delete</button>
                      ) : (
                        <button
                          onClick={() => handleRowDelete(index, user.name)}
                        >
                          delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
