"use client";
import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Prescribe() {
  const [showHistory, setShowHistory] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  // Form state
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    pressure1: "",
    pressure2: "",
    cc: "",
    oe: "",
    invs: "",
    adv: "",
  });

  // Patient ID state
  const [patientId, setPatientId] = useState<number | null>(null);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const [patientError, setPatientError] = useState<string>("");
  const [isLoadingPatient, setIsLoadingPatient] = useState(false);
  const [patientFromUrl, setPatientFromUrl] = useState(false);
  const [isUpdatingPatient, setIsUpdatingPatient] = useState(false);
  const [patientUpdateSuccess, setPatientUpdateSuccess] = useState(false);

  // Add state for dynamic medicine fields
  const [medicines, setMedicines] = useState([
    { name: "", nums: ["", "", ""], comment: "" },
  ]);

  // Add state for prescription saving
  const [isSavingPrescription, setIsSavingPrescription] = useState(false);
  const [prescriptionError, setPrescriptionError] = useState<string>("");

  // Add state for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editPrescriptionId, setEditPrescriptionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const urlEmail = searchParams?.get("email");
    if (urlEmail) {
      localStorage.setItem("email", urlEmail);
      setEmail(urlEmail);
    } else {
      const stored = localStorage.getItem("email") || "";
      setEmail(stored);
    }

    // Check if patient ID is passed in URL
    const urlPatientId = searchParams?.get("patientId");
    if (urlPatientId) {
      const patientIdNum = parseInt(urlPatientId);
      if (!isNaN(patientIdNum)) {
        fetchPatientById(patientIdNum);

        // Only load prescription data if we're in edit mode (edit=1 in URL)
        const isEdit = searchParams?.get("edit") === "1";
        if (isEdit) {
          // Also load prescription data if coming from preview page (edit mode)
          const prescriptionData = localStorage.getItem("prescriptionData");
          if (prescriptionData) {
            const parsed = JSON.parse(prescriptionData);
            // Only load prescription fields (cc, oe, invs, adv, medicines)
            // Patient data will be loaded by fetchPatientById
            setTimeout(() => {
              setForm((prev) => ({
                ...prev,
                cc: parsed.cc || "",
                oe: parsed.oe || "",
                invs: parsed.invs || "",
                adv: parsed.adv || "",
              }));

              // Load medicines from localStorage if available
              if (
                parsed.medicines &&
                Array.isArray(parsed.medicines) &&
                parsed.medicines.length > 0
              ) {
                setMedicines(parsed.medicines);
              }
            }, 100); // Small delay to ensure patient data loads first
          }
        }

        return; // Skip other initialization when loading from URL
      }
    }

    // Check if we should load patient data
    // Only prefill if ?edit=1 is present
    const isEdit = searchParams?.get("edit") === "1";
    // hasPatientData is true if both ?edit=1 and ?patientId are present
    const hasPatientData = isEdit && !!searchParams?.get("patientId");

    if (hasPatientData) {
      // Load patient data from localStorage
      const patientData = localStorage.getItem("patientData");
      if (patientData) {
        const parsed = JSON.parse(patientData);
        setForm({
          name: parsed.name || "",
          age: parsed.age || "",
          gender: parsed.gender || "",
          weight: parsed.weight || "",
          pressure1: parsed.pressure1 || "",
          pressure2: parsed.pressure2 || "",
          cc: parsed.cc || "",
          oe: parsed.oe || "",
          invs: parsed.invs || "",
          adv: parsed.adv || "",
        });
        // Clear the patient data from localStorage after loading
        localStorage.removeItem("patientData");
      }
      // Reset medicines to default when loading patient data
      setMedicines([{ name: "", nums: ["", "", ""], comment: "" }]);
      setPatientId(null);
      setPatientError("");
      setPatientFromUrl(false);
      setPatientUpdateSuccess(false);
    } else if (isEdit) {
      const prescriptionData = localStorage.getItem("prescriptionData");
      if (prescriptionData) {
        const parsed = JSON.parse(prescriptionData);
        setForm({
          name: parsed.name || "",
          age: parsed.age || "",
          gender: parsed.gender || "",
          weight: parsed.weight || "",
          pressure1: parsed.pressure1 || "",
          pressure2: parsed.pressure2 || "",
          cc: parsed.cc || "",
          oe: parsed.oe || "",
          invs: parsed.invs || "",
          adv: parsed.adv || "",
        });
        // Load medicines from localStorage if available
        if (
          parsed.medicines &&
          Array.isArray(parsed.medicines) &&
          parsed.medicines.length > 0
        ) {
          setMedicines(parsed.medicines);
        }
        // Set patient ID if available in prescription data
        if (parsed.patientId) {
          setPatientId(parsed.patientId);
        }
        // Set edit mode and prescription ID
        setIsEditMode(true);
        if (parsed.prescriptionId) {
          setEditPrescriptionId(parsed.prescriptionId);
        }
      }
    } else {
      setForm({
        name: "",
        age: "",
        gender: "",
        weight: "",
        pressure1: "",
        pressure2: "",
        cc: "",
        oe: "",
        invs: "",
        adv: "",
      });
      // Reset medicines to default when not editing
      setMedicines([{ name: "", nums: ["", "", ""], comment: "" }]);
      setPatientId(null);
      setPatientError("");
      setPatientFromUrl(false);
      setPatientUpdateSuccess(false);
      // Reset edit mode
      setIsEditMode(false);
      setEditPrescriptionId(null);
    }
  }, [searchParams]);

  const mockHistory = [
    {
      id: 1,
      date: "2024-12-01",
      notes: "Prescribed Amoxicillin 500mg for 7 days. Advised rest.",
    },
    {
      id: 2,
      date: "2024-11-15",
      notes: "Follow-up visit. Condition improving. Reduced dosage.",
    },
    {
      id: 3,
      date: "2024-11-01",
      notes: "Initial consultation. Diagnosed with throat infection.",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setForm((prev) => ({ ...prev, gender: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMedicineChange = (
    idx: number,
    field: string,
    value: string,
    numIdx?: number
  ) => {
    setMedicines((prev) =>
      prev.map((med, i) => {
        if (i !== idx) return med;
        if (field === "name") return { ...med, name: value };
        if (field === "comment") return { ...med, comment: value };
        if (field === "num" && numIdx !== undefined) {
          const newNums = [...med.nums];
          newNums[numIdx] = value;
          return { ...med, nums: newNums };
        }
        return med;
      })
    );
  };

  const addMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      { name: "", nums: ["", "", ""], comment: "" },
    ]);
  };

  const removeMedicine = () => {
    setMedicines((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  // Create patient function
  const createPatient = async () => {
    if (!form.name.trim()) {
      setPatientError("Patient name is required");
      return null;
    }

    setIsCreatingPatient(true);
    setPatientError("");

    try {
      // First create basic patient with name and phone (empty for now)
      const basicPatientResponse = await fetch(
        "http://localhost:8080/api/patients/basic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            phoneNumber: "N/A", // Placeholder phone number
          }),
        }
      );

      if (!basicPatientResponse.ok) {
        const errorData = await basicPatientResponse.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create basic patient");
      }

      const basicPatient = await basicPatientResponse.json();
      const newPatientId = basicPatient.id;

      // Now update with additional details if they exist
      const hasAdditionalDetails =
        form.age ||
        form.gender ||
        form.weight ||
        form.pressure1 ||
        form.pressure2;

      if (hasAdditionalDetails) {
        const updateData: any = {};

        if (form.age) updateData.age = parseInt(form.age);
        if (form.gender) updateData.gender = form.gender;
        if (form.weight) updateData.weight = parseFloat(form.weight);
        if (form.pressure1 && form.pressure2) {
          updateData.bloodPressure = `${form.pressure1}/${form.pressure2}`;
        } else if (form.pressure1) {
          updateData.bloodPressure = `${form.pressure1}/0`;
        } else if (form.pressure2) {
          updateData.bloodPressure = `0/${form.pressure2}`;
        }

        const updateResponse = await fetch(
          `http://localhost:8080/api/patients/${newPatientId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          }
        );

        if (!updateResponse.ok) {
          const errorData = await updateResponse.json().catch(() => ({}));
          throw new Error(
            errorData.error || "Failed to update patient details"
          );
        }
      }

      setPatientId(newPatientId);
      console.log(`Patient created successfully with ID: ${newPatientId}`);
      return newPatientId;
    } catch (error) {
      console.error("Error creating patient:", error);
      setPatientError(
        error instanceof Error ? error.message : "Failed to create patient"
      );
      return null;
    } finally {
      setIsCreatingPatient(false);
    }
  };

  // Fetch patient information by ID
  const fetchPatientById = async (id: number) => {
    setIsLoadingPatient(true);
    setPatientError("");

    try {
      const response = await fetch(`http://localhost:8080/api/patients/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch patient");
      }

      const patient = await response.json();

      // Pre-populate form with patient data
      const [pressure1 = "", pressure2 = ""] = patient.bloodPressure
        ? patient.bloodPressure.split("/")
        : ["", ""];

      setForm({
        name: patient.name || "",
        age: patient.age ? patient.age.toString() : "",
        gender: patient.gender || "",
        weight: patient.weight ? patient.weight.toString() : "",
        pressure1: pressure1,
        pressure2: pressure2,
        cc: "",
        oe: "",
        invs: "",
        adv: "",
      });

      setPatientId(patient.id);
      setPatientFromUrl(true);
      console.log(`Patient loaded successfully with ID: ${patient.id}`);
    } catch (error) {
      console.error("Error fetching patient:", error);
      setPatientError(
        error instanceof Error ? error.message : "Failed to fetch patient"
      );
    } finally {
      setIsLoadingPatient(false);
    }
  };

  // Update patient details function
  const updatePatientDetails = async () => {
    if (!patientId) {
      setPatientError("No patient ID available for update");
      return;
    }

    setIsUpdatingPatient(true);
    setPatientError("");
    setPatientUpdateSuccess(false);

    try {
      const updateData: any = {};

      if (form.age) updateData.age = parseInt(form.age);
      if (form.weight) updateData.weight = parseFloat(form.weight);
      if (form.pressure1 && form.pressure2) {
        updateData.bloodPressure = `${form.pressure1}/${form.pressure2}`;
      } else if (form.pressure1) {
        updateData.bloodPressure = `${form.pressure1}/0`;
      } else if (form.pressure2) {
        updateData.bloodPressure = `0/${form.pressure2}`;
      }

      const response = await fetch(
        `http://localhost:8080/api/patients/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update patient details");
      }

      setPatientUpdateSuccess(true);
      console.log(`Patient updated successfully with ID: ${patientId}`);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setPatientUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating patient:", error);
      setPatientError(
        error instanceof Error ? error.message : "Failed to update patient"
      );
    } finally {
      setIsUpdatingPatient(false);
    }
  };

  // Function to get doctor ID by email
  const getDoctorIdByEmail = async (email: string): Promise<number | null> => {
    try {
      console.log("Fetching doctor ID for email:", email);
      const response = await fetch(
        `http://localhost:8080/api/doctors/email/${email}`
      );
      console.log("Doctor fetch response status:", response.status);

      if (!response.ok) {
        console.error("Failed to fetch doctor. Status:", response.status);
        throw new Error(`HTTP ${response.status}`);
      }
      const doctor = await response.json();
      console.log("Doctor data received:", doctor);
      return doctor.doctorId;
    } catch (error) {
      console.error("Error fetching doctor ID:", error);
      return null;
    }
  };

  // Test function to check backend connectivity
  const testBackendConnection = async () => {
    try {
      console.log("Testing backend connection...");
      const response = await fetch("http://localhost:8080/api/prescriptions");
      console.log("Backend connection test - Status:", response.status);
      const data = await response.json();
      console.log("Backend connection test - Data:", data);
    } catch (error) {
      console.error("Backend connection test failed:", error);
    }
  };

  const handleContinue = async () => {
    // Create patient first if not already created
    let currentPatientId = patientId;

    if (!currentPatientId) {
      currentPatientId = await createPatient();
      if (!currentPatientId) {
        // Patient creation failed, error message already set
        return;
      }
    }

    // Get doctor ID from email
    const doctorId = await getDoctorIdByEmail(email);
    console.log("Doctor ID fetched:", doctorId);
    if (!doctorId) {
      setPrescriptionError(
        "Failed to get doctor information. Please try again."
      );
      return;
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const currentDate = `${yyyy}-${mm}-${dd}`;

    // Filter and validate medicines
    const validMedicines = medicines.filter((med) => med.name.trim() !== "");
    console.log("Valid medicines count:", validMedicines.length);

    if (validMedicines.length === 0) {
      setPrescriptionError("Please add at least one medicine with a name.");
      return;
    }

    // Validate medicine data
    for (let i = 0; i < validMedicines.length; i++) {
      const med = validMedicines[i];
      if (!med.name || med.name.trim() === "") {
        setPrescriptionError(`Medicine ${i + 1} name is required.`);
        return;
      }
      // Ensure nums array has 3 elements
      if (!med.nums || med.nums.length !== 3) {
        setPrescriptionError(
          `Medicine ${i + 1} dosage information is incomplete.`
        );
        return;
      }
    }

    // Prepare prescription data for API
    const prescriptionData = {
      patientId: currentPatientId,
      doctorId: doctorId,
      prescriptionDate: currentDate,
      chiefComplaint: form.cc,
      onExamination: form.oe,
      investigations: form.invs,
      advice: form.adv,
      medicines: validMedicines, // Use the validated medicines
    };

    // Debug logging - log the data being sent
    console.log(
      "Sending prescription data:",
      JSON.stringify(prescriptionData, null, 2)
    );

    setIsSavingPrescription(true);
    setPrescriptionError("");

    try {
      // Determine if we're editing or creating
      const isEditing = isEditMode && editPrescriptionId;
      const apiUrl = isEditing
        ? `http://localhost:8080/api/prescriptions/${editPrescriptionId}/from-frontend`
        : "http://localhost:8080/api/prescriptions/from-frontend";
      const method = isEditing ? "PUT" : "POST";

      console.log(
        `${
          isEditing ? "Updating" : "Creating"
        } prescription using ${method} to ${apiUrl}`
      );

      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescriptionData),
      });

      // Log response status and headers for debugging
      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      const result = await response.json();
      console.log("Response body:", result);

      if (result.success) {
        console.log(
          `Prescription ${isEditing ? "updated" : "saved"}:`,
          result.data
        );

        // Save prescription data to localStorage for preview page (as backup)
        localStorage.setItem(
          "prescriptionData",
          JSON.stringify({
            ...form,
            date: currentDate,
            medicines,
            patientId: currentPatientId,
            prescriptionId: result.data.id,
          })
        );

        // Navigate to preview page with prescription ID
        router.push(
          `/doctor/prescribe/preview?prescriptionId=${result.data.id}`
        );
      } else {
        console.error(
          `Error ${isEditing ? "updating" : "saving"} prescription:`,
          result.error
        );
        console.error(
          "Error details:",
          result.details || "No details provided"
        );
        setPrescriptionError(
          `${result.error}${result.details ? ` - ${result.details}` : ""}`
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      setPrescriptionError(
        `Network error: Failed to ${
          isEditMode ? "update" : "save"
        } prescription`
      );
    } finally {
      setIsSavingPrescription(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* Form Section */}
          <div className="w-full max-w-2xl mx-auto md:mx-0 bg-white border border-green-200 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-green-800 flex items-center gap-3">
              {isEditMode ? "Edit Prescription" : "New Prescription"}
              {isEditMode && (
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  Editing ID: {editPrescriptionId}
                </span>
              )}
            </h2>

            {/* Patient Creation Status */}
            {patientError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
                {patientError}
              </div>
            )}

            {/* Prescription Saving Status */}
            {prescriptionError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
                {prescriptionError}
              </div>
            )}

            {isLoadingPatient && (
              <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-700">
                Loading patient information...
              </div>
            )}

            {patientId && patientFromUrl && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700">
                Patient loaded successfully! ID: {patientId}
              </div>
            )}

            {patientId && !patientFromUrl && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700">
                Patient created successfully! ID: {patientId}
              </div>
            )}

            {patientUpdateSuccess && (
              <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-700">
                Patient details updated successfully!
              </div>
            )}
            <form className="space-y-5">
              {/* Patient ID Display Box - Only show when patient is loaded from URL */}
              {patientFromUrl && patientId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-700">
                      Patient ID:
                    </span>
                    <span className="text-lg font-bold text-blue-800">
                      {patientId}
                    </span>
                    <span className="ml-auto text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Existing Patient
                    </span>
                  </div>
                </div>
              )}

              {/* Note for existing patient */}
              {patientFromUrl && (
                <div className="mb-4 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="font-medium">Note:</span> Patient name and
                  gender cannot be edited. You can update age, weight, and blood
                  pressure.
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Patient Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 h-[42px] ${
                      patientFromUrl ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    autoComplete="off"
                    disabled={patientFromUrl}
                  />
                </div>
                <div className="flex flex-col w-24">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 h-[42px]"
                    autoComplete="off"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="flex flex-col justify-end h-full min-h-[60px]">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Gender:
                  </label>
                  <div className="flex items-center gap-2 h-[42px]">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={form.gender === "Male"}
                        onChange={handleChange}
                        className="accent-green-600"
                        disabled={patientFromUrl}
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={form.gender === "Female"}
                        onChange={handleChange}
                        className="accent-green-600"
                        disabled={patientFromUrl}
                      />
                      <span>Female</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Create Patient Button - Only show when not loading from URL */}
              {!patientFromUrl && (
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={createPatient}
                    disabled={
                      isCreatingPatient || !form.name.trim() || !!patientId
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                      isCreatingPatient || !form.name.trim() || !!patientId
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isCreatingPatient
                      ? "Creating Patient..."
                      : patientId
                      ? "Patient Created"
                      : "Create Patient"}
                  </button>

                  {patientId && !patientFromUrl && (
                    <span className="text-sm text-green-600 font-medium">
                      ✓ Patient ID: {patientId}
                    </span>
                  )}
                </div>
              )}

              {/* Update Patient Button - Only show when loading from URL */}
              {patientFromUrl && (
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={updatePatientDetails}
                    disabled={isUpdatingPatient}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                      isUpdatingPatient
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700 text-white"
                    }`}
                  >
                    {isUpdatingPatient
                      ? "Updating..."
                      : "Update Patient Details"}
                  </button>

                  <span className="text-sm text-blue-600 font-medium">
                    Patient ID: {patientId}
                  </span>
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex flex-col w-32">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    name="weight"
                    value={form.weight ?? ""}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, weight: e.target.value }))
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 h-[42px]"
                    autoComplete="off"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="flex flex-col w-40">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Pressure (mmHg)
                  </label>
                  <div className="flex items-center gap-2 h-[42px]">
                    <input
                      name="pressure1"
                      value={form.pressure1 ?? ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          pressure1: e.target.value,
                        }))
                      }
                      className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                      autoComplete="off"
                      type="number"
                      min="0"
                    />
                    <span>/</span>
                    <input
                      name="pressure2"
                      value={form.pressure2 ?? ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          pressure2: e.target.value,
                        }))
                      }
                      className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                      autoComplete="off"
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  C/C (Chief Complaint)
                </label>
                <textarea
                  name="cc"
                  value={form.cc}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows={3}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  O/E (On Examination)
                </label>
                <textarea
                  name="oe"
                  value={form.oe}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows={3}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Invs (Investigations)
                </label>
                <textarea
                  name="invs"
                  value={form.invs}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows={2}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  ADV (Advice)
                </label>
                <textarea
                  name="adv"
                  value={form.adv}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows={2}
                />
              </div>
              {/* Dynamic Medicine Section */}
              <div className="flex flex-col gap-6 mt-6">
                {medicines.map((med, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative"
                  >
                    <div className="flex flex-col mb-2">
                      <label className="mb-1 text-sm font-medium text-gray-700">
                        Medicine Name
                      </label>
                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) =>
                          handleMedicineChange(idx, "name", e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm font-medium text-gray-700 mr-2">
                        Dosage
                      </label>
                      <input
                        type="number"
                        value={med.nums[0]}
                        onChange={(e) =>
                          handleMedicineChange(idx, "num", e.target.value, 0)
                        }
                        className="w-12 border border-gray-300 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                        min="0"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={med.nums[1]}
                        onChange={(e) =>
                          handleMedicineChange(idx, "num", e.target.value, 1)
                        }
                        className="w-12 border border-gray-300 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                        min="0"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={med.nums[2]}
                        onChange={(e) =>
                          handleMedicineChange(idx, "num", e.target.value, 2)
                        }
                        className="w-12 border border-gray-300 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                        min="0"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="mb-1 text-sm font-medium text-gray-700">
                        Comment
                      </label>
                      <textarea
                        value={med.comment}
                        onChange={(e) =>
                          handleMedicineChange(idx, "comment", e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        rows={2}
                      />
                    </div>
                    {/* Remove button for all but the first set */}
                    {medicines.length > 1 && idx === medicines.length - 1 && (
                      <button
                        type="button"
                        onClick={removeMedicine}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                        aria-label="Remove medicine"
                      >
                        &minus;
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMedicine}
                  className="self-end bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-md"
                  aria-label="Add medicine"
                >
                  +
                </button>
              </div>
              <div className="flex items-center justify-end gap-4 mt-6">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200"
                  onClick={() => {
                    setForm({
                      name: "",
                      age: "",
                      gender: "",
                      weight: "",
                      pressure1: "",
                      pressure2: "",
                      cc: "",
                      oe: "",
                      invs: "",
                      adv: "",
                    });
                    setMedicines([
                      { name: "", nums: ["", "", ""], comment: "" },
                    ]);
                    setPatientId(null);
                    setPatientError("");
                    setPatientFromUrl(false);
                    setPatientUpdateSuccess(false);
                    // Reset edit mode
                    setIsEditMode(false);
                    setEditPrescriptionId(null);
                  }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleContinue}
                  disabled={isCreatingPatient || isSavingPrescription}
                >
                  {isCreatingPatient
                    ? "Creating Patient..."
                    : isSavingPrescription
                    ? isEditMode
                      ? "Updating Prescription..."
                      : "Saving Prescription..."
                    : isEditMode
                    ? "Update and Continue"
                    : "Save and Continue"}
                </button>
              </div>
            </form>
          </div>

          {/* History Toggle Section */}
          <div className="w-full md:w-[300px] flex flex-col justify-start items-center text-center">
            <button
              onClick={() => setShowHistory((prev) => !prev)}
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-4 rounded-2xl text-lg shadow-md transition-all duration-300"
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>
            {showHistory && (
              <div className="mt-6 w-full bg-green-50/70 border border-green-200 rounded-2xl p-4 space-y-4 shadow">
                <h2 className="text-xl font-semibold border-b border-green-400 pb-2 text-green-800">
                  Prescription History
                </h2>
                {mockHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="border-l-4 border-green-600 pl-4 text-left"
                  >
                    <p className="text-sm text-gray-500">{entry.date}</p>
                    <p className="text-gray-800">{entry.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
