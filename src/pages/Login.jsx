import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { validateEmail, validatePassword } from "../validation/FormValidations";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    if (formData.email === "" || formData.password === "")
      return alert("please fill all fields");
    if (!validateEmail(formData.email)) return alert("Email is invalid");
    if (!validatePassword(formData.password))
      return alert(
        "Password should contain upper case,lowercase,one digit atleast 8 chars"
      );

    const users = JSON.parse(localStorage.getItem("users"));

    if (!users) return alert("oops! something went wrong");
    const user = users.find((user) => user.email === formData.email);

    if (!user) {
      return alert("user dosen't exist ,try registering");
    }

    if (user.email !== formData.email && user.password !== formData.password)
      return alert("email or password is wrong");

    localStorage.setItem("currentUser", JSON.stringify(user));

    navigate("/home", {
      state: user,
    });
  };
  return (
    <div className="login_container">
      <h2>LOGIN</h2>
      <div className="field_container">
        <InputField
          name="email"
          title="Email"
          type="text"
          onChange={handleChange}
          value={formData.email}
        />

        <InputField
          name="password"
          title="Password"
          type={showPassword ? "text" : "password"}
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
        <div style={{ marginTop: "20px" }}>
          <Link style={{ textDecoration: "none" }} to="/register">
            New User ? Try Register
          </Link>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <Button onClick={handleLogin} title="Login " />
      </div>
    </div>
  );
}
