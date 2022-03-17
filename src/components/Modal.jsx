import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import InputField from "./InputField";
import { validateEmail, validatePhone } from "../validation/FormValidations";

export default function Modal({ setIsOpen, row, setUserDetails, isOpen }) {
  const users = JSON.parse(localStorage.getItem("users"));
  const user = users[row];
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
    phone: user.phone,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (row) => {
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.phone === ""
    )
      return alert("please fill all fields");
    if (!validateEmail(formData.email)) return alert("Email is invalid");
    if (!validatePhone(formData.phone))
      return alert("Phone Number should be at least 10 digit");

    const otherUsers = users.filter((user, index) => index !== row);

    const updatedUser = {
      ...user,
      ["email"]: formData.email,
      ["name"]: formData.name,
      ["phone"]: formData.phone,
    };
    const newUsersCollection = [...otherUsers, updatedUser];

    localStorage.setItem("users", JSON.stringify(newUsersCollection));
    setUserDetails(newUsersCollection);
    setIsOpen(false);
  };
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2 className={styles.heading}>Change User data</h2>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className={styles.modalContent}>
            <div style={{ width: "60%" }}>
              <InputField
                title="Name"
                onChange={(e) => handleChange(e)}
                value={formData.name}
                type="text"
                name="name"
              />
              <InputField
                title="Email"
                onChange={(e) => handleChange(e)}
                value={formData.email}
                type="text"
                name="email"
              />
              <InputField
                title="Phone"
                onChange={(e) => handleChange(e)}
                value={formData.phone}
                type="text"
                name="phone"
              />
            </div>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => handleUpdate(row)}
              >
                Update
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
