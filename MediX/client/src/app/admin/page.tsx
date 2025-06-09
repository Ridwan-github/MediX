"use client";

import React, { useState } from "react";

export default function Page() {
  // State to track login status
  const [loggedIn, setLoggedIn] = useState(false);

  // State for login form inputs
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Account Management form states
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    role: "",
    gender: "",
  });

  // Handler for login submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // You can add validation here

    // Simulate login success
    setLoggedIn(true);
  };

  // Handler for Google login (simulate)
  const handleGoogleLogin = () => {
    // Implement Google OAuth here
    alert("Google login clicked (simulate)");
    setLoggedIn(true);
  };

  // Account Management handlers
  const handleUserInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setUserInfo((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleAddUser = () => {
    alert(`User added:\n${JSON.stringify(userInfo, null, 2)}`);
    // Clear form or do other logic
  };

  const handleClearTexts = () => {
    setUserInfo({
      name: "",
      age: "",
      phone: "",
      email: "",
      role: "",
      gender: "",
    });
  };

  return (
    <>
      {!loggedIn ? (
        // Login Page
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          {/* Left green panel */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #51792c 0%, #93b56a 100%)",
              width: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              padding: 40,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            {/* <img
              src="/mnt/data/f09dc5a0-39a1-483d-8dbc-a78a3be799f1.png"
              alt="Hikmah Hospital Logo"
              style={{ width: 140, marginBottom: 20 }}
            /> */}
            <h2
              style={{
                fontWeight: "bold",
                fontSize: 24,
                textAlign: "center",
                userSelect: "none",
              }}
            >
              Hikmah <br /> Hospital
            </h2>
          </div>

          {/* Right login form */}
          <div
            style={{
              flexGrow: 1,
              backgroundColor: "white",
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              color: "#3e1e70",
            }}
          >
            <h1 style={{ fontWeight: "bold", fontSize: 28, marginBottom: 40 }}>
              Login
            </h1>

            <form onSubmit={handleLogin} style={{ maxWidth: 500, width: "100%" }}>
              {/* ID Input */}
              <label
                htmlFor="id"
                style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}
              >
                ID
              </label>
              <input
                id="id"
                type="text"
                placeholder="Enter your ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                style={{
                  width: "100%",
                  height: 50,
                  borderRadius: 8,
                  border: "1px solid #5a348f",
                  paddingLeft: 12,
                  fontSize: 16,
                  marginBottom: 20,
                  color: "#3e1e70",
                }}
              />

              <div
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginBottom: 20,
                  fontWeight: "600",
                }}
              >
                OR
              </div>

              {/* Email Input */}
              <label
                htmlFor="email"
                style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  height: 50,
                  borderRadius: 8,
                  border: "1px solid #5a348f",
                  paddingLeft: 12,
                  fontSize: 16,
                  marginBottom: 20,
                  color: "#3e1e70",
                }}
              />

              {/* Password Input */}
              <label
                htmlFor="password"
                style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  height: 50,
                  borderRadius: 8,
                  border: "1px solid #5a348f",
                  paddingLeft: 12,
                  fontSize: 16,
                  marginBottom: 10,
                  color: "#3e1e70",
                }}
              />
              <div
                style={{
                  fontSize: 12,
                  color: "#8a6cd6",
                  textAlign: "right",
                  cursor: "pointer",
                  marginBottom: 30,
                  userSelect: "none",
                }}
                onClick={() => alert("Forgot Password clicked")}
              >
                Forget Password?
              </div>

              {/* Login Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "#4b278f",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  marginBottom: 20,
                }}
              >
                Login
              </button>
            </form>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              style={{
                width: "95%",
                height: 50,
                borderRadius: 8,
                border: "1px solid #555",
                backgroundColor: "white",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google logo"
                style={{ width: 20, height: 20 }}
              /> */}
              Login with Gmail
            </button>
          </div>
        </div>
      ) : (
        // Account Management Page
        <>
          <div
            style={{
              backgroundColor: "#23400c",
              color: "white",
              padding: "10px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <div>
              <span role="img" aria-label="settings" style={{ marginRight: 8 }}>
                ⚙️
              </span>
              Account Management
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setLoggedIn(false);
                // Optionally clear state on logout
              }}
              title="Logout"
            >
              <span role="img" aria-label="user">
                👤
              </span>
            </div>
          </div>

          {/* Sub-navigation */}
          <div
            style={{
              backgroundColor: "#2f6011",
              color: "white",
              padding: "8px 30px",
              fontWeight: "bold",
              display: "flex",
              gap: 15,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              fontSize: 16,
            }}
          >
            <div style={{ cursor: "pointer" }}>Add</div>
            <div style={{ cursor: "pointer" }}>|</div>
            <div style={{ cursor: "pointer" }}>Show List</div>
          </div>

          <div style={{ padding: 30, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* User Info Header */}
            <h2
              style={{
                fontWeight: "bold",
                borderBottom: "2px solid black",
                paddingBottom: 6,
                maxWidth: 200,
                userSelect: "none",
                marginBottom: 30,
              }}
            >
              User Info
            </h2>

            <form
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                maxWidth: 900,
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser();
              }}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  style={{
                    color: "#5a348f",
                    fontWeight: "600",
                    marginBottom: 4,
                    display: "inline-block",
                  }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleUserInfoChange}
                  type="text"
                  placeholder="Enter Name"
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    border: "1px solid #5a348f",
                    paddingLeft: 8,
                    fontSize: 16,
                    color: "#5a348f",
                  }}
                />
              </div>

              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  style={{
                    color: "#5a348f",
                    fontWeight: "600",
                    marginBottom: 4,
                    display: "inline-block",
                  }}
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  value={userInfo.age}
                  onChange={handleUserInfoChange}
                  type="number"
                  placeholder="Enter Age"
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    border: "1px solid #5a348f",
                    paddingLeft: 8,
                    fontSize: 16,
                    color: "#5a348f",
                  }}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  style={{
                    color: "#5a348f",
                    fontWeight: "600",
                    marginBottom: 4,
                    display: "inline-block",
                  }}
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange}
                  type="tel"
                  placeholder="Enter Phone Number"
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    border: "1px solid #5a348f",
                    paddingLeft: 8,
                    fontSize: 16,
                    color: "#5a348f",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="emailAM"
                  style={{
                    color: "#5a348f",
                    fontWeight: "600",
                    marginBottom: 4,
                    display: "inline-block",
                  }}
                >
                  Email
                </label>
                <input
                  id="emailAM"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  type="email"
                  placeholder="Enter Email"
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    border: "1px solid #5a348f",
                    paddingLeft: 8,
                    fontSize: 16,
                    color: "#5a348f",
                  }}
                />
              </div>

              {/* Role dropdown */}
              <div style={{ gridColumn: "1 / span 2" }}>
                <label
                  htmlFor="role"
                  style={{
                    color: "#5a348f",
                    fontWeight: "600",
                    marginBottom: 4,
                    display: "inline-block",
                  }}
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={userInfo.role}
                  onChange={handleUserInfoChange}
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    border: "1px solid #5a348f",
                    paddingLeft: 8,
                    fontSize: 16,
                    color: "#5a348f",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select Role</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Receptionist">Receptionist</option>
                  {/* Add more roles as needed */}
                </select>
              </div>

              {/* Gender */}
              <div
                style={{
                  gridColumn: "1 / span 2",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <label
                  style={{
                    color: "#5a348f",
                    fontWeight: "600",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Gender:
                </label>
                <button
                  type="button"
                  onClick={() => handleGenderSelect("M")}
                  style={{
                    border: `1.5px solid ${
                      userInfo.gender === "M" ? "#5a348f" : "#ccc"
                    }`,
                    borderRadius: 6,
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: userInfo.gender === "M" ? "#5a348f" : "#666",
                    backgroundColor: "white",
                  }}
                >
                  M
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderSelect("F")}
                  style={{
                    border: `1.5px solid ${
                      userInfo.gender === "F" ? "#5a348f" : "#ccc"
                    }`,
                    borderRadius: 6,
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: userInfo.gender === "F" ? "#5a348f" : "#666",
                    backgroundColor: "white",
                  }}
                >
                  F
                </button>
              </div>

              {/* Buttons */}
              <div
                style={{
                  gridColumn: "1 / span 2",
                  display: "flex",
                  gap: 20,
                  justifyContent: "center",
                  marginTop: 40,
                }}
              >
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#4b278f",
                    color: "white",
                    borderRadius: 8,
                    padding: "10px 30px",
                    fontWeight: "bold",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                >
                  Add User
                </button>
                <button
                  type="button"
                  onClick={handleClearTexts}
                  style={{
                    backgroundColor: "#4b278f",
                    color: "white",
                    borderRadius: 8,
                    padding: "10px 30px",
                    fontWeight: "bold",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                >
                  Clear Texts
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <footer
            style={{
              background:
                "linear-gradient(135deg, #51792c 0%, #93b56a 100%)",
              color: "white",
              padding: "20px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* <img
                src="/mnt/data/f09dc5a0-39a1-483d-8dbc-a78a3be799f1.png"
                alt="Hikmah Hospital Logo"
                style={{ width: 80 }}
              /> */}
                          <div style={{ fontSize: 16 }}>
                            <div>Hikmah</div>
                          </div>
                        </div>
                      </footer>
                    </>
                  )}
                </>
              );
            }
