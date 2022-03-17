import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import "../css/Register.css";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../validation/FormValidations";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const selection = useRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisteration = () => {
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.name === "" ||
      formData.phone === ""
    )
      return alert("please fill all fields");
    if (!validateEmail(formData.email)) return alert("Email is invalid");
    if (!validatePassword(formData.password))
      return alert(
        "Password should contain upper case,lowercase,one digit atleast 8 chars"
      );

    if (!validatePhone(formData.phone))
      return alert("Please enter a valid phone number");

    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      const role = selection.current.value;
      const userData = [{ ...formData, role }];
      localStorage.setItem("users", JSON.stringify(userData));
    } else {
      const isUserExisting = users.find(
        (user) => user.email === formData.email
      );
      if (isUserExisting) {
        return alert("user already exists try login");
      }
      const role = selection.current.value;
      const userData = [...users, { ...formData, role }];
      localStorage.setItem("users", JSON.stringify(userData));
      navigate("/login");
    }
  };

  return (
    <div className="register_container">
      <h2>Register</h2>
      <div className="field_container">
        <InputField
          name="name"
          title="Full Name"
          type="text"
          onChange={handleChange}
          value={formData.name}
        />
        <InputField
          title="Email"
          type="text"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <InputField
          title="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />
          <p style={{ marginLeft: "10px" }}>show password</p>
        </div>
        <InputField
          title="Phone"
          type="text"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
        />
        <select style={{ padding: "5px", marginTop: "10px" }} ref={selection}>
          <option value="admin" defaultChecked>
            admin
          </option>
          <option value="user">user</option>
        </select>
        <div style={{ marginTop: "20px" }}>
          <Link style={{ textDecoration: "none" }} to="/login">
            Already registered ? try login
          </Link>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button onClick={handleRegisteration} title="Register" />
      </div>
    </div>
  );
}
