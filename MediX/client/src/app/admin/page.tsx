"use client";

import React, { useState } from "react";

export default function Page() {
// Account Management form states
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    role: "",
    gender: "",
  });

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
            <div style={{ cursor: "pointer" }}>Edit</div>
            <div style={{ cursor: "pointer" }}>|</div>
            <div style={{ cursor: "pointer" }}>Delete</div>
            <div style={{ cursor: "pointer" }}>|</div>
            <div style={{ cursor: "pointer" }}>Show List</div>
          </div>

          <div
            style={{
              padding: 30,
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
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
              background: "linear-gradient(135deg, #51792c 0%, #93b56a 100%)",
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
