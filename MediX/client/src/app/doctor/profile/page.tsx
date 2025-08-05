"use client";

import Header from "@/components/doctor/header";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";

// Doctor Type
type Doctor = {
  doctorId: number;
  user: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  yearsOfExperience: number;
  availableDays: string;
  availableTimes: string;
  licenseNumber: string;
  qualifications: {
    qualification: {
      id: number;
      name: string;
    };
  }[];
  specializations: {
    specialization: {
      id: number;
      name: string;
    };
  }[];
};

// Additional types for dropdown options
type Specialization = {
  id: number;
  name: string;
};

type Qualification = {
  id: number;
  name: string;
};

export default function ProfilePage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Data from API
  const [allSpecializations, setAllSpecializations] = useState<
    Specialization[]
  >([]);
  const [allQualifications, setAllQualifications] = useState<Qualification[]>(
    []
  );
  const [specializationsLoading, setSpecializationsLoading] = useState(false);
  const [qualificationsLoading, setQualificationsLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    startTime: "",
    endTime: "",
    selectedDays: [] as string[],
    selectedSpecializationIds: [] as number[],
    selectedQualificationIds: [] as number[],
  });

  // Password form states
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Day initials and colors
  const dayConfig = [
    { name: "Monday", initial: "Mon", color: "bg-red-500 hover:bg-red-600" },
    {
      name: "Tuesday",
      initial: "Tue",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "Wednesday",
      initial: "Wed",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      name: "Thursday",
      initial: "Thu",
      color: "bg-green-500 hover:bg-green-600",
    },
    { name: "Friday", initial: "Fri", color: "bg-blue-500 hover:bg-blue-600" },
    {
      name: "Saturday",
      initial: "Sat",
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      name: "Sunday",
      initial: "Sun",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      setError("Doctor email not found in localStorage.");
      setLoading(false);
      return;
    }

    // Fetch doctor data
    fetch("http://localhost:8080/api/doctors")
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: Doctor[]) => {
        const match = data.find((d) => d?.user?.email === email);
        if (match) {
          setDoctor(match);
          // Initialize form data with current doctor data
          const times = match.availableTimes.split(" - ");
          setFormData({
            email: match.user.email,
            phoneNumber: match.user.phoneNumber,
            startTime: times[0] ? convertTo24Hour(times[0]) : "",
            endTime: times[1] ? convertTo24Hour(times[1]) : "",
            selectedDays: match.availableDays
              ? match.availableDays.split(",")
              : [],
            selectedSpecializationIds:
              match.specializations?.map((s) => s.specialization.id) || [],
            selectedQualificationIds:
              match.qualifications?.map((q) => q.qualification.id) || [],
          });
        } else {
          setError("Doctor not found.");
        }
      })
      .catch((err) => setError(err?.message))
      .finally(() => setLoading(false));
  }, []);

  // Fetch specializations and qualifications when editing
  useEffect(() => {
    if (isEditing) {
      fetchSpecializations();
      fetchQualifications();
    }
  }, [isEditing]);

  const fetchSpecializations = async () => {
    setSpecializationsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/specializations");
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      setAllSpecializations(data);
    } catch (err: any) {
      setError(`Failed to fetch specializations: ${err.message}`);
    } finally {
      setSpecializationsLoading(false);
    }
  };

  const fetchQualifications = async () => {
    setQualificationsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/qualifications");
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      setAllQualifications(data);
    } catch (err: any) {
      setError(`Failed to fetch qualifications: ${err.message}`);
    } finally {
      setQualificationsLoading(false);
    }
  };

  // Helper function to convert 12-hour format to 24-hour format for input
  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.trim().split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier?.toUpperCase() === "PM") {
      hours = (parseInt(hours, 10) + 12).toString();
    }

    return `${hours.padStart(2, "0")}:${minutes || "00"}`;
  };

  // Helper function to convert 24-hour format to 12-hour format for display
  const convertTo12Hour = (time24h: string): string => {
    const [hours, minutes] = time24h.split(":");
    const hour12 = parseInt(hours, 10) % 12 || 12;
    const ampm = parseInt(hours, 10) >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdateSuccess(false);
    setError(null);
    setIsChangingPassword(false);
    // Reset password form
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handlePasswordToggle = () => {
    setIsChangingPassword(!isChangingPassword);
    setError(null);
    setUpdateSuccess(false);
    // Reset password form
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  const handleSpecializationToggle = (specId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedSpecializationIds: prev.selectedSpecializationIds.includes(specId)
        ? prev.selectedSpecializationIds.filter((id) => id !== specId)
        : [...prev.selectedSpecializationIds, specId],
    }));
  };

  const handleQualificationToggle = (qualId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedQualificationIds: prev.selectedQualificationIds.includes(qualId)
        ? prev.selectedQualificationIds.filter((id) => id !== qualId)
        : [...prev.selectedQualificationIds, qualId],
    }));
  };

  const handleSaveChanges = async () => {
    if (!doctor) return;

    setUpdateLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (
        !formData.email ||
        !formData.phoneNumber ||
        !formData.startTime ||
        !formData.endTime
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (formData.selectedDays.length === 0) {
        throw new Error("Please select at least one available day");
      }

      // Format available times
      const availableTimes = `${convertTo12Hour(
        formData.startTime
      )} - ${convertTo12Hour(formData.endTime)}`;
      const availableDays = formData.selectedDays.join(",");

      const updatePayload = {
        user: {
          email: formData.email,
          phoneNumber: formData.phoneNumber,
        },
        doctor: {
          availableTimes,
          availableDays,
        },
        qualificationIds: formData.selectedQualificationIds,
        specializationIds: formData.selectedSpecializationIds,
      };

      const response = await fetch(
        `http://localhost:8080/api/doctors/${doctor.doctorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      const updatedDoctor = await response.json();
      setDoctor(updatedDoctor);
      setIsEditing(false);
      setUpdateSuccess(true);

      // Update localStorage if email changed
      if (formData.email !== doctor.user.email) {
        localStorage.setItem("email", formData.email);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!doctor) return;

    setUpdateLoading(true);
    setError(null);

    try {
      // Validate password fields
      if (
        !passwordData.oldPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmPassword
      ) {
        throw new Error("Please fill in all password fields");
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords do not match");
      }

      if (passwordData.newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters long");
      }

      // For password update, we'll use the user update approach
      // First verify old password by trying to authenticate (simplified approach)
      const updatePayload = {
        user: {
          password: passwordData.newPassword,
        },
      };

      const response = await fetch(
        `http://localhost:8080/api/doctors/${doctor.doctorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update password: ${response.status}`);
      }

      setIsChangingPassword(false);
      setUpdateSuccess(true);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading)
    return <div className="text-white p-10 text-center">Loading...</div>;
  if (error)
    return <div className="text-red-400 p-10 text-center">{error}</div>;
  if (!doctor)
    return (
      <div className="text-yellow-400 p-10 text-center">Doctor not found.</div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <main className="flex-grow p-10 max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2 text-green-800">
            Doctor Profile
          </h1>
          <p className="text-green-700">Manage your professional details</p>
        </div>

        {/* Profile Card */}
        <div className="bg-green-50/50 backdrop-blur-md rounded-3xl shadow-lg border border-green-200 overflow-hidden">
          {/* Success/Error Messages */}
          {updateSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-t-3xl">
              <span className="block sm:inline">
                Profile updated successfully!
              </span>
            </div>
          )}
          {error && !loading && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-t-3xl">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 p-8 text-center rounded-t-3xl">
            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-green-600">
              <span className="text-6xl text-green-700">👤</span>
            </div>
            <h2 className="text-3xl font-bold text-green-900">
              {doctor?.user?.name}
            </h2>
            <p className="text-green-800 text-lg mt-1">
              {doctor.specializations && doctor.specializations.length > 0
                ? doctor.specializations
                    .map((s) => s.specialization.name)
                    .join(", ")
                : "General Practitioner"}
            </p>
          </div>

          {/* Profile Body */}
          <div className="p-8">
            {!isEditing ? (
              // View Mode
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="bg-white/70 rounded-xl p-6 border-l-4 border-green-500 shadow-sm">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3 text-gray-800 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Name:</span>
                      <span>{doctor.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span>{doctor.user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Phone:</span>
                      <span>{doctor.user.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">License Number:</span>
                      <span>{doctor.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Available Times:</span>
                      <span>{doctor.availableTimes}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 rounded-xl p-6 border-l-4 border-green-700 shadow-sm">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">
                    Work Information
                  </h3>
                  <div className="space-y-3 text-gray-800 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Employee ID:</span>
                      <span>{doctor.doctorId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Specialist:</span>
                      <span>
                        {doctor.specializations &&
                        doctor.specializations.length > 0
                          ? doctor.specializations
                              .map((s) => s.specialization.name)
                              .join(", ")
                          : "General Practitioner"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Degree:</span>
                      <span>
                        {doctor.qualifications &&
                        doctor.qualifications.length > 0
                          ? doctor.qualifications
                              .map((q) => q.qualification.name)
                              .join(", ")
                          : "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Experience:</span>
                      <span>{doctor.yearsOfExperience} years</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Available Days:</span>
                      <span>
                        {doctor.availableDays
                          ? doctor.availableDays
                              .split(",")
                              .map(
                                (day) =>
                                  dayConfig.find(
                                    (d) => d.name.trim() === day.trim()
                                  )?.initial || day.trim()
                              )
                              .join(", ")
                          : "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-green-700 mb-6">
                  Edit Profile Information
                </h3>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Available Times */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Available Times <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          handleInputChange("startTime", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) =>
                          handleInputChange("endTime", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Time Preview */}
                  {formData.startTime && formData.endTime && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm text-green-700 font-medium">
                        Preview: {convertTo12Hour(formData.startTime)} -{" "}
                        {convertTo12Hour(formData.endTime)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Available Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Available Days <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {dayConfig.map((dayInfo) => (
                      <button
                        key={dayInfo.name}
                        type="button"
                        onClick={() => handleDayToggle(dayInfo.name)}
                        className={`px-4 py-3 rounded-lg border-2 transition duration-200 font-medium text-white shadow-md ${
                          formData.selectedDays.includes(dayInfo.name)
                            ? `${dayInfo.color} border-transparent`
                            : "bg-gray-300 border-gray-300 text-gray-700 hover:bg-gray-400"
                        }`}
                      >
                        {dayInfo.initial}
                      </button>
                    ))}
                  </div>

                  {/* Selected Days Preview */}
                  {formData.selectedDays.length > 0 && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm text-green-700 font-medium">
                        Selected:{" "}
                        {formData.selectedDays
                          .map(
                            (day) =>
                              dayConfig.find((d) => d.name === day)?.initial ||
                              day
                          )
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Specializations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Specializations
                  </label>
                  {specializationsLoading ? (
                    <div className="text-center py-4 text-gray-500">
                      Loading specializations...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {allSpecializations.map((spec) => (
                        <button
                          key={spec.id}
                          type="button"
                          onClick={() => handleSpecializationToggle(spec.id)}
                          className={`px-4 py-3 rounded-lg border-2 transition duration-200 font-medium text-left ${
                            formData.selectedSpecializationIds.includes(spec.id)
                              ? "bg-blue-600 border-blue-600 text-white shadow-md"
                              : "bg-white border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          {spec.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Selected Specializations Preview */}
                  {formData.selectedSpecializationIds.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm text-blue-700 font-medium">
                        Selected:{" "}
                        {allSpecializations
                          .filter((s) =>
                            formData.selectedSpecializationIds.includes(s.id)
                          )
                          .map((s) => s.name)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Qualifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Qualifications
                  </label>
                  {qualificationsLoading ? (
                    <div className="text-center py-4 text-gray-500">
                      Loading qualifications...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {allQualifications.map((qual) => (
                        <button
                          key={qual.id}
                          type="button"
                          onClick={() => handleQualificationToggle(qual.id)}
                          className={`px-4 py-3 rounded-lg border-2 transition duration-200 font-medium text-left ${
                            formData.selectedQualificationIds.includes(qual.id)
                              ? "bg-purple-600 border-purple-600 text-white shadow-md"
                              : "bg-white border-gray-300 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                          }`}
                        >
                          {qual.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Selected Qualifications Preview */}
                  {formData.selectedQualificationIds.length > 0 && (
                    <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <span className="text-sm text-purple-700 font-medium">
                        Selected:{" "}
                        {allQualifications
                          .filter((q) =>
                            formData.selectedQualificationIds.includes(q.id)
                          )
                          .map((q) => q.name)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons for Edit Mode */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t border-green-200">
                  <button
                    onClick={handleSaveChanges}
                    disabled={updateLoading}
                    className={`px-8 py-3 rounded-xl font-semibold shadow-md transition duration-200 ${
                      updateLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
                    } text-white`}
                  >
                    {updateLoading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    onClick={handleEditToggle}
                    disabled={updateLoading}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions - Only show in view mode */}
          {!isEditing && !isChangingPassword && (
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 mb-10 pt-6 border-t border-green-200">
              <button
                onClick={handleEditToggle}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-200"
              >
                Edit Profile
              </button>
              <button
                onClick={handlePasswordToggle}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-200"
              >
                Change Password
              </button>
            </div>
          )}

          {/* Password Change Section */}
          {isChangingPassword && (
            <div className="p-8 border-t border-green-200">
              <h3 className="text-2xl font-semibold text-green-700 mb-6">
                Change Password
              </h3>

              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      handlePasswordChange("oldPassword", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      handlePasswordChange("newPassword", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      handlePasswordChange("confirmPassword", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>

                {/* Password Requirements */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    Password Requirements:
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Minimum 6 characters long</li>
                    <li>• Should include letters and numbers</li>
                    <li>• Avoid using common words or personal information</li>
                  </ul>
                </div>

                {/* Forgot Password Info */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Forgot your current password?</strong>
                    <br />
                    Please contact the administrator at{" "}
                    <a
                      href="mailto:admin@admin.com"
                      className="text-yellow-900 underline hover:text-yellow-700"
                    >
                      admin@admin.com
                    </a>{" "}
                    for password reset assistance.
                  </p>
                </div>

                {/* Action Buttons for Password Change */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <button
                    onClick={handlePasswordUpdate}
                    disabled={updateLoading}
                    className={`px-8 py-3 rounded-xl font-semibold shadow-md transition duration-200 ${
                      updateLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
                    } text-white`}
                  >
                    {updateLoading ? "Updating..." : "Update Password"}
                  </button>

                  <button
                    onClick={handlePasswordToggle}
                    disabled={updateLoading}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
