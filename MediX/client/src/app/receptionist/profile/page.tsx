"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";

type ReceptionistProfile = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  id: string;
  role: string;
};

type EditFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  workingHours: string;
};

type PasswordChangeData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ProfilePage() {
  const [receptionistProfile, setReceptionistProfile] =
    useState<ReceptionistProfile | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordMode, setIsPasswordMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const [editForm, setEditForm] = useState<EditFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    workingHours: "9 AM - 5 PM",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordChangeData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [workingHours, setWorkingHours] = useState({
    startTime: "09:00",
    endTime: "17:00",
  });

  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const receptionistId = localStorage.getItem("receptionistId");
    if (!receptionistId || receptionistId.trim() === "") {
      router.push("/");
      return;
    }
  }, [router]);

  useEffect(() => {
    // Get receptionist data from localStorage
    const storedData = localStorage.getItem("receptionistData");
    if (storedData) {
      const data = JSON.parse(storedData);
      const profile = {
        name: data.name || "N/A",
        email: data.email || "N/A",
        phoneNumber: data.phoneNumber || "N/A",
        address: data.address || "N/A",
        id: data.id?.toString() || "N/A",
        role: "Receptionist",
      };
      setReceptionistProfile(profile);
      setEditForm({
        name: data.name || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
        workingHours: "9 AM - 5 PM",
      });
    } else {
      // Fallback: try to get individual items from localStorage
      const name = localStorage.getItem("receptionistName");
      const email = localStorage.getItem("receptionistEmail");
      const phoneNumber = localStorage.getItem("receptionistPhoneNumber");
      const address = localStorage.getItem("receptionistAddress");
      const id = localStorage.getItem("receptionistId");

      if (name || email || phoneNumber || address || id) {
        const profile = {
          name: name || "N/A",
          email: email || "N/A",
          phoneNumber: phoneNumber || "N/A",
          address: address || "N/A",
          id: id || "N/A",
          role: "Receptionist",
        };
        setReceptionistProfile(profile);
        setEditForm({
          name: name || "",
          email: email || "",
          phoneNumber: phoneNumber || "",
          address: address || "",
          workingHours: "9 AM - 5 PM",
        });
      }
    }
  }, []);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const formatTimeToDisplay = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${ampm}`;
  };

  const updateWorkingHours = () => {
    const startDisplay = formatTimeToDisplay(workingHours.startTime);
    const endDisplay = formatTimeToDisplay(workingHours.endTime);
    setEditForm((prev) => ({
      ...prev,
      workingHours: `${startDisplay} - ${endDisplay}`,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const receptionistId = localStorage.getItem("receptionistId");
      if (!receptionistId) {
        showMessage("Receptionist ID not found", "error");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/receptionists/${receptionistId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: editForm.email,
            phoneNumber: editForm.phoneNumber,
            address: editForm.address,
          }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();

        // Update localStorage
        localStorage.setItem("receptionistData", JSON.stringify(updatedData));
        localStorage.setItem("receptionistName", updatedData.name);
        localStorage.setItem("receptionistEmail", updatedData.email);
        localStorage.setItem(
          "receptionistPhoneNumber",
          updatedData.phoneNumber
        );
        localStorage.setItem("receptionistAddress", updatedData.address);

        // Update state
        setReceptionistProfile({
          ...updatedData,
          id: updatedData.id?.toString() || receptionistId,
          role: "Receptionist",
        });

        showMessage("Profile updated successfully!", "success");
        setIsEditMode(false);
      } else {
        const errorData = await response.json();
        showMessage(errorData.error || "Failed to update profile", "error");
      }
    } catch (error) {
      showMessage("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage("New passwords do not match", "error");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showMessage("New password must be at least 6 characters long", "error");
      return;
    }

    setLoading(true);

    try {
      const receptionistId = localStorage.getItem("receptionistId");
      const storedData = localStorage.getItem("receptionistData");

      if (!receptionistId || !storedData) {
        showMessage("Receptionist data not found", "error");
        return;
      }

      const currentData = JSON.parse(storedData);

      // First verify current password by attempting login
      const loginResponse = await fetch(
        "http://localhost:8080/api/receptionists/by-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentData.email,
            password: passwordForm.currentPassword,
          }),
        }
      );

      if (!loginResponse.ok) {
        showMessage("Current password is incorrect", "error");
        return;
      }

      // If current password is correct, update with new password
      const updateResponse = await fetch(
        `http://localhost:8080/api/receptionists/${receptionistId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: passwordForm.newPassword,
          }),
        }
      );

      if (updateResponse.ok) {
        showMessage("Password changed successfully!", "success");
        setIsPasswordMode(false);
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const errorData = await updateResponse.json();
        showMessage(errorData.error || "Failed to change password", "error");
      }
    } catch (error) {
      showMessage("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!receptionistProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      <main className="flex-grow px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Message Display */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl border-l-4 animate-fade-in ${
                messageType === "success"
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-red-50 border-red-500 text-red-700"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-2">
                  {messageType === "success" ? "✅" : "❌"}
                </span>
                {message}
              </div>
            </div>
          )}

          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-800">
              Receptionist Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your profile information
            </p>
          </div>

          {/* Main Content */}
          {!isEditMode && !isPasswordMode ? (
            /* Profile View */
            <div className="rounded-3xl shadow-[6px_6px_16px_#d0d4da,-6px_-6px_16px_#ffffff] overflow-hidden border border-gray-200 bg-white">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-700 p-8 text-white text-center relative">
                <div className="w-28 h-28 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-5xl text-green-600">👤</span>
                </div>
                <h2 className="text-3xl font-semibold">
                  {receptionistProfile?.name}
                </h2>
                <p className="text-green-100 mt-1">
                  {receptionistProfile?.role}
                </p>
              </div>

              {/* Info Grid */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-6 shadow-[inset_4px_4px_10px_#cfe9c7,inset_-4px_-4px_10px_#ffffff]">
                  <h3 className="text-sm font-semibold text-green-600 uppercase mb-4 tracking-wider">
                    Personal Information
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">
                        {receptionistProfile?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">
                        {receptionistProfile?.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">
                        {receptionistProfile?.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Work Info */}
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6 shadow-[inset_4px_4px_10px_#cfdffa,inset_-4px_-4px_10px_#ffffff]">
                  <h3 className="text-sm font-semibold text-blue-600 uppercase mb-4 tracking-wider">
                    Work Information
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Employee ID:</span>
                      <span className="font-medium">
                        {receptionistProfile?.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Working Hours:</span>
                      <span className="font-medium">
                        {editForm.workingHours}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Address:</span>
                      <span className="font-medium">
                        {receptionistProfile?.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-6 p-8 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => {
                    // Update form with current profile data when entering edit mode (only editable fields)
                    if (receptionistProfile) {
                      setEditForm({
                        name: receptionistProfile.name || "", // Keep for display but won't be edited
                        email: receptionistProfile.email || "",
                        phoneNumber: receptionistProfile.phoneNumber || "",
                        address: receptionistProfile.address || "",
                        workingHours: editForm.workingHours, // Keep current working hours
                      });
                    }
                    setIsEditMode(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-[4px_4px_10px_#bfd8be,-4px_-4px_10px_#ffffff] transition duration-200 transform hover:scale-105"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setIsPasswordMode(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl shadow-[4px_4px_10px_#c8ccd1,-4px_-4px_10px_#ffffff] transition duration-200 transform hover:scale-105"
                >
                  Change Password
                </button>
              </div>
            </div>
          ) : isEditMode ? (
            /* Edit Profile Form */
            <div className="rounded-3xl shadow-[6px_6px_16px_#d0d4da,-6px_-6px_16px_#ffffff] overflow-hidden border border-gray-200 bg-white">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-white text-center">
                <h2 className="text-3xl font-semibold">Edit Profile</h2>
                <p className="text-blue-100 mt-1">Update your information</p>
              </div>

              <form onSubmit={handleEditSubmit} className="p-8 space-y-6">
                {/* Non-editable Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name{" "}
                    <span className="text-gray-400 text-xs">(Read-only)</span>
                  </label>
                  <input
                    type="text"
                    value={receptionistProfile?.name || ""}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed shadow-[inset_2px_2px_5px_#d0d4da,inset_-2px_-2px_5px_#ffffff]"
                    disabled
                    readOnly
                  />
                  <p className="text-xs text-gray-500">
                    Name changes require admin approval. Contact admin@admin.com
                  </p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-[inset_2px_2px_5px_#d0d4da,inset_-2px_-2px_5px_#ffffff]"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editForm.phoneNumber}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-[inset_2px_2px_5px_#d0d4da,inset_-2px_-2px_5px_#ffffff]"
                    required
                  />
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <textarea
                    value={editForm.address}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-[inset_2px_2px_5px_#d0d4da,inset_-2px_-2px_5px_#ffffff] resize-none"
                    rows={3}
                    required
                  />
                </div>

                {/* Non-editable Working Hours */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Working Hours{" "}
                    <span className="text-gray-400 text-xs">(Read-only)</span>
                  </label>
                  <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 shadow-[inset_2px_2px_5px_#d0d4da,inset_-2px_-2px_5px_#ffffff]">
                    {editForm.workingHours}
                  </div>
                  <p className="text-xs text-gray-500">
                    Working hours are set by administration and cannot be
                    modified
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-xl shadow-[4px_4px_10px_#b8c5d1,-4px_-4px_10px_#ffffff] transition duration-200 transform hover:scale-105 disabled:scale-100"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Updating...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl shadow-[4px_4px_10px_#c8ccd1,-4px_-4px_10px_#ffffff] transition duration-200 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Change Password Form */
            <div className="rounded-3xl shadow-[6px_6px_16px_#d0d4da,-6px_-6px_16px_#ffffff] overflow-hidden border border-gray-200 bg-white">
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-8 text-white text-center">
                <h2 className="text-3xl font-semibold">Change Password</h2>
                <p className="text-purple-100 mt-1">
                  Update your account security
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="p-8 space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 shadow-[inset_2px_2px_5px_#d0d4da,inset_-2px_-2px_5px_#ffffff]"
                    required
                  />
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 shadow-[inset_2px_2px_5px_#d0d4da,inset_-2px_-2px_5px_#ffffff]"
                    minLength={6}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 shadow-[inset_2px_2px_5px_#d0d4da,inset_-2px_-2px_5px_#ffffff]"
                    minLength={6}
                    required
                  />
                </div>

                {/* Password Note */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-yellow-400">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Note:</strong> If you forgot your current
                        password, please contact the admin at{" "}
                        <a
                          href="mailto:admin@admin.com"
                          className="underline hover:text-yellow-900 transition duration-200"
                        >
                          admin@admin.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-3 rounded-xl shadow-[4px_4px_10px_#c4b5d6,-4px_-4px_10px_#ffffff] transition duration-200 transform hover:scale-105 disabled:scale-100"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Changing...
                      </div>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPasswordMode(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl shadow-[4px_4px_10px_#c8ccd1,-4px_-4px_10px_#ffffff] transition duration-200 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
