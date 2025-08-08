# MediX Backend API Documentation

## Overview

This document provides comprehensive API documentation for the MediX Healthcare Management System backend. The APIs are organized by modules and include sample requests and responses for each endpoint.

**Base URL:** `http://localhost:8080`

## Table of Contents

- [Authentication & User Management](#authentication--user-management)
- [Patient Management](#patient-management)
- [Doctor Management](#doctor-management)
- [Appointment Management](#appointment-management)
- [Prescription Management](#prescription-management)
- [Receptionist Management](#receptionist-management)
- [Qualification Management](#qualification-management)
- [Specialization Management](#specialization-management)

---

## Authentication & User Management

### Base URL: `/api/users`

### 1. Get All Users

- **Method:** `GET`
- **Endpoint:** `/api/users`
- **Description:** Retrieve all users in the system
- **Authentication:** Not specified
- **Request Body:** None

**Sample Response:**

```json
[
  {
    "id": 1,
    "name": "Dr. John Smith",
    "email": "john.smith@medix.com",
    "phoneNumber": "+1234567890",
    "password": "hashedPassword123",
    "address": "123 Medical St, Healthcare City"
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane.doe@medix.com",
    "phoneNumber": "+1234567891",
    "password": "hashedPassword456",
    "address": "456 Health Ave, Medical Town"
  }
]
```

---

## Patient Management

### Base URL: `/api/patients`

### 1. Create Basic Patient

- **Method:** `POST`
- **Endpoint:** `/api/patients/basic`
- **Description:** Create a basic patient with minimal information
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "name": "Alice Johnson",
  "phoneNumber": "+1234567892"
}
```

**Sample Response:**

```json
{
  "id": 101,
  "name": "Alice Johnson",
  "age": null,
  "gender": null,
  "phoneNumber": "+1234567892",
  "weight": null,
  "bloodPressure": null
}
```

**Error Response:**

```json
{
  "error": "Name and phone number are required"
}
```

### 2. Update Patient Details

- **Method:** `PUT`
- **Endpoint:** `/api/patients/{id}`
- **Description:** Update existing patient information
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "name": "Alice Johnson",
  "age": 28,
  "gender": "Female",
  "phoneNumber": "+1234567892",
  "weight": 65.5,
  "bloodPressure": "120/80"
}
```

**Sample Response:**

```json
{
  "id": 101,
  "name": "Alice Johnson",
  "age": 28,
  "gender": "Female",
  "phoneNumber": "+1234567892",
  "weight": 65.5,
  "bloodPressure": "120/80"
}
```

### 3. Get All Patients

- **Method:** `GET`
- **Endpoint:** `/api/patients`
- **Description:** Retrieve all patients
- **Authentication:** Not specified

**Sample Response:**

```json
[
  {
    "id": 101,
    "name": "Alice Johnson",
    "age": 28,
    "gender": "Female",
    "phoneNumber": "+1234567892",
    "weight": 65.5,
    "bloodPressure": "120/80"
  },
  {
    "id": 102,
    "name": "Bob Wilson",
    "age": 35,
    "gender": "Male",
    "phoneNumber": "+1234567893",
    "weight": 78.0,
    "bloodPressure": "130/85"
  }
]
```

### 4. Get Patient by ID

- **Method:** `GET`
- **Endpoint:** `/api/patients/{id}`
- **Description:** Retrieve a specific patient by ID
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "id": 101,
  "name": "Alice Johnson",
  "age": 28,
  "gender": "Female",
  "phoneNumber": "+1234567892",
  "weight": 65.5,
  "bloodPressure": "120/80"
}
```

### 5. Get Patient by Phone Number (Query Param)

- **Method:** `GET`
- **Endpoint:** `/api/patients/by-phone?phoneNumber={phoneNumber}`
- **Description:** Find patient by phone number using query parameter
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "id": 101,
  "name": "Alice Johnson",
  "age": 28,
  "gender": "Female",
  "phoneNumber": "+1234567892",
  "weight": 65.5,
  "bloodPressure": "120/80"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Patient not found",
  "data": {
    "phoneNumber": "+1234567892"
  }
}
```

### 6. Find Patient by Phone Number (POST)

- **Method:** `POST`
- **Endpoint:** `/api/patients/find-by-phone`
- **Description:** Find patient by phone number using POST request
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "phoneNumber": "+1234567892"
}
```

**Sample Response:**

```json
{
  "success": true,
  "message": "Patient found",
  "data": {
    "id": 101,
    "name": "Alice Johnson",
    "age": 28,
    "gender": "Female",
    "phoneNumber": "+1234567892",
    "weight": 65.5,
    "bloodPressure": "120/80"
  }
}
```

---

## Doctor Management

### Base URL: `/api/doctors`

### 1. Create Doctor with User Account

- **Method:** `POST`
- **Endpoint:** `/api/doctors`
- **Description:** Create a new doctor with associated user account, qualifications, and specializations
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "user": {
    "id": 201,
    "name": "Dr. Sarah Wilson",
    "email": "sarah.wilson@medix.com",
    "phoneNumber": "+1234567894",
    "password": "securePassword123",
    "address": "789 Medical Plaza, Health District"
  },
  "doctor": {
    "doctorId": 201,
    "yearsOfExperience": 8,
    "availableDays": "Monday,Tuesday,Wednesday,Friday",
    "availableTimes": "09:00-17:00",
    "licenseNumber": "MD123456789"
  },
  "qualificationIds": [1, 2],
  "specializationIds": [1, 3]
}
```

**Sample Response:**

```json
{
  "doctorId": 201,
  "user": {
    "id": 201,
    "name": "Dr. Sarah Wilson",
    "email": "sarah.wilson@medix.com",
    "phoneNumber": "+1234567894",
    "address": "789 Medical Plaza, Health District"
  },
  "yearsOfExperience": 8,
  "availableDays": "Monday,Tuesday,Wednesday,Friday",
  "availableTimes": "09:00-17:00",
  "licenseNumber": "MD123456789",
  "qualifications": [
    {
      "id": {
        "doctorId": 201,
        "qualificationId": 1
      },
      "qualification": {
        "id": 1,
        "name": "MBBS"
      }
    }
  ],
  "specializations": [
    {
      "id": {
        "doctorId": 201,
        "specializationId": 1
      },
      "specialization": {
        "id": 1,
        "name": "Cardiology"
      }
    }
  ]
}
```

### 2. Get All Doctors

- **Method:** `GET`
- **Endpoint:** `/api/doctors`
- **Description:** Retrieve all doctors
- **Authentication:** Not specified

**Sample Response:**

```json
[
  {
    "doctorId": 201,
    "user": {
      "id": 201,
      "name": "Dr. Sarah Wilson",
      "email": "sarah.wilson@medix.com",
      "phoneNumber": "+1234567894",
      "address": "789 Medical Plaza, Health District"
    },
    "yearsOfExperience": 8,
    "availableDays": "Monday,Tuesday,Wednesday,Friday",
    "availableTimes": "09:00-17:00",
    "licenseNumber": "MD123456789",
    "qualifications": [],
    "specializations": []
  }
]
```

### 3. Get Doctor by ID

- **Method:** `GET`
- **Endpoint:** `/api/doctors/{id}`
- **Description:** Retrieve a specific doctor by ID
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "doctorId": 201,
  "user": {
    "id": 201,
    "name": "Dr. Sarah Wilson",
    "email": "sarah.wilson@medix.com",
    "phoneNumber": "+1234567894",
    "address": "789 Medical Plaza, Health District"
  },
  "yearsOfExperience": 8,
  "availableDays": "Monday,Tuesday,Wednesday,Friday",
  "availableTimes": "09:00-17:00",
  "licenseNumber": "MD123456789",
  "qualifications": [],
  "specializations": []
}
```

### 4. Get Doctor by Email

- **Method:** `GET`
- **Endpoint:** `/api/doctors/email/{email}`
- **Description:** Retrieve a doctor by email address
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "doctorId": 201,
  "user": {
    "id": 201,
    "name": "Dr. Sarah Wilson",
    "email": "sarah.wilson@medix.com",
    "phoneNumber": "+1234567894",
    "address": "789 Medical Plaza, Health District"
  },
  "yearsOfExperience": 8,
  "availableDays": "Monday,Tuesday,Wednesday,Friday",
  "availableTimes": "09:00-17:00",
  "licenseNumber": "MD123456789"
}
```

### 5. Add Doctor Qualifications

- **Method:** `POST`
- **Endpoint:** `/api/doctors/{doctorId}/qualifications`
- **Description:** Add qualifications to an existing doctor
- **Authentication:** Not specified

**Sample Request:**

```json
[1, 2, 3]
```

**Sample Response:**

```json
{
  "doctorId": 201,
  "user": {
    "id": 201,
    "name": "Dr. Sarah Wilson",
    "email": "sarah.wilson@medix.com"
  },
  "qualifications": [
    {
      "id": {
        "doctorId": 201,
        "qualificationId": 1
      },
      "qualification": {
        "id": 1,
        "name": "MBBS"
      }
    },
    {
      "id": {
        "doctorId": 201,
        "qualificationId": 2
      },
      "qualification": {
        "id": 2,
        "name": "MD"
      }
    }
  ]
}
```

### 6. Add Doctor Specializations

- **Method:** `POST`
- **Endpoint:** `/api/doctors/{doctorId}/specializations`
- **Description:** Add specializations to an existing doctor
- **Authentication:** Not specified

**Sample Request:**

```json
[1, 2]
```

**Sample Response:**

```json
{
  "doctorId": 201,
  "user": {
    "id": 201,
    "name": "Dr. Sarah Wilson",
    "email": "sarah.wilson@medix.com"
  },
  "specializations": [
    {
      "id": {
        "doctorId": 201,
        "specializationId": 1
      },
      "specialization": {
        "id": 1,
        "name": "Cardiology"
      }
    },
    {
      "id": {
        "doctorId": 201,
        "specializationId": 2
      },
      "specialization": {
        "id": 2,
        "name": "Neurology"
      }
    }
  ]
}
```

### 7. Update Doctor Information

- **Method:** `PUT`
- **Endpoint:** `/api/doctors/{doctorId}`
- **Description:** Update doctor's user account information, professional details, qualifications, and specializations
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "user": {
    "name": "Dr. Sarah Wilson Updated",
    "email": "sarah.wilson.updated@medix.com",
    "phoneNumber": "+1234567999",
    "password": "newSecurePassword123",
    "address": "Updated Address, New Medical Plaza"
  },
  "doctor": {
    "yearsOfExperience": 10,
    "availableDays": "Monday,Tuesday,Wednesday,Thursday,Friday",
    "availableTimes": "08:00-18:00",
    "licenseNumber": "MD987654321"
  },
  "qualificationIds": [1, 2, 3],
  "specializationIds": [1, 2]
}
```

**Sample Response:**

```json
{
  "doctorId": 201,
  "user": {
    "id": 201,
    "name": "Dr. Sarah Wilson Updated",
    "email": "sarah.wilson.updated@medix.com",
    "phoneNumber": "+1234567999",
    "address": "Updated Address, New Medical Plaza"
  },
  "yearsOfExperience": 10,
  "availableDays": "Monday,Tuesday,Wednesday,Thursday,Friday",
  "availableTimes": "08:00-18:00",
  "licenseNumber": "MD987654321",
  "qualifications": [
    {
      "id": {
        "doctorId": 201,
        "qualificationId": 1
      },
      "qualification": {
        "id": 1,
        "name": "MBBS"
      }
    },
    {
      "id": {
        "doctorId": 201,
        "qualificationId": 2
      },
      "qualification": {
        "id": 2,
        "name": "MD"
      }
    },
    {
      "id": {
        "doctorId": 201,
        "qualificationId": 3
      },
      "qualification": {
        "id": 3,
        "name": "PhD"
      }
    }
  ],
  "specializations": [
    {
      "id": {
        "doctorId": 201,
        "specializationId": 1
      },
      "specialization": {
        "id": 1,
        "name": "Cardiology"
      }
    },
    {
      "id": {
        "doctorId": 201,
        "specializationId": 2
      },
      "specialization": {
        "id": 2,
        "name": "Neurology"
      }
    }
  ]
}
```

**Note:** All fields in the request are optional. Only provided fields will be updated. If qualificationIds or specializationIds are provided, they will completely replace the existing qualifications/specializations.

---

## Appointment Management

### Base URL: `/api/appointments`

### 1. Create Appointment

- **Method:** `POST`
- **Endpoint:** `/api/appointments`
- **Description:** Create a new appointment
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "patientId": 101,
  "doctorId": 201,
  "appointmentDate": "2025-08-15"
}
```

**Sample Response:**

```json
{
  "id": 301,
  "patientId": 101,
  "doctorId": 201,
  "appointmentDate": "2025-08-15",
  "status": "SCHEDULED"
}
```

### 2. Update Appointment Status

- **Method:** `PUT`
- **Endpoint:** `/api/appointments/{id}/status`
- **Description:** Update the status of an existing appointment
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "status": "COMPLETED"
}
```

**Sample Response:**

```json
{
  "id": 301,
  "patientId": 101,
  "doctorId": 201,
  "appointmentDate": "2025-08-15",
  "status": "COMPLETED"
}
```

### 3. Get All Appointments

- **Method:** `GET`
- **Endpoint:** `/api/appointments`
- **Description:** Retrieve all appointments
- **Authentication:** Not specified

**Sample Response:**

```json
[
  {
    "id": 301,
    "patientId": 101,
    "doctorId": 201,
    "appointmentDate": "2025-08-15",
    "status": "SCHEDULED"
  },
  {
    "id": 302,
    "patientId": 102,
    "doctorId": 201,
    "appointmentDate": "2025-08-16",
    "status": "COMPLETED"
  }
]
```

### 4. Get Appointment by ID

- **Method:** `GET`
- **Endpoint:** `/api/appointments/{id}`
- **Description:** Retrieve a specific appointment by ID
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "id": 301,
  "patientId": 101,
  "doctorId": 201,
  "appointmentDate": "2025-08-15",
  "status": "SCHEDULED"
}
```

### 5. Get Appointments with Details

- **Method:** `GET`
- **Endpoint:** `/api/appointments/with-details`
- **Description:** Retrieve all appointments with patient and doctor details
- **Authentication:** Not specified

**Sample Response:**

```json
[
  {
    "id": 301,
    "patientId": 101,
    "patientName": "Alice Johnson",
    "doctorId": 201,
    "doctorName": "Dr. Sarah Wilson",
    "appointmentDate": "2025-08-15",
    "status": "SCHEDULED"
  }
]
```

### 6. Get Appointments by Patient ID

- **Method:** `GET`
- **Endpoint:** `/api/appointments/patient/{patientId}`
- **Description:** Retrieve all appointments for a specific patient
- **Authentication:** Not specified

**Sample Response:**

```json
[
  {
    "id": 301,
    "patientId": 101,
    "doctorId": 201,
    "appointmentDate": "2025-08-15",
    "status": "SCHEDULED"
  },
  {
    "id": 305,
    "patientId": 101,
    "doctorId": 203,
    "appointmentDate": "2025-08-20",
    "status": "COMPLETED"
  }
]
```

**Error Response:**

```json
{
  "error": "Patient not found",
  "patientId": 999
}
```

---

## Prescription Management

### Base URL: `/api/prescriptions`

### 1. Create Prescription (Direct)

- **Method:** `POST`
- **Endpoint:** `/api/prescriptions`
- **Description:** Create a new prescription directly
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "patientId": 101,
  "doctorId": 201,
  "prescriptionDate": "2025-08-15",
  "chiefComplaint": "Chest pain and shortness of breath",
  "onExamination": "Patient appears stable, mild tachycardia observed",
  "investigations": "ECG, Blood pressure monitoring",
  "advice": "Rest, avoid strenuous activities, follow-up in 1 week",
  "medicines": [
    {
      "medicineName": "Aspirin",
      "morningDose": 1,
      "afternoonDose": 0,
      "eveningDose": 1,
      "comment": "Take with food"
    },
    {
      "medicineName": "Metoprolol",
      "morningDose": 1,
      "afternoonDose": 0,
      "eveningDose": 0,
      "comment": "Monitor blood pressure"
    }
  ]
}
```

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescription created successfully",
  "data": {
    "id": 401,
    "patientId": 101,
    "doctorId": 201,
    "prescriptionDate": "2025-08-15",
    "chiefComplaint": "Chest pain and shortness of breath",
    "onExamination": "Patient appears stable, mild tachycardia observed",
    "investigations": "ECG, Blood pressure monitoring",
    "advice": "Rest, avoid strenuous activities, follow-up in 1 week",
    "medicines": [
      {
        "id": 501,
        "medicineName": "Aspirin",
        "morningDose": 1,
        "afternoonDose": 0,
        "eveningDose": 1,
        "comment": "Take with food"
      },
      {
        "id": 502,
        "medicineName": "Metoprolol",
        "morningDose": 1,
        "afternoonDose": 0,
        "eveningDose": 0,
        "comment": "Monitor blood pressure"
      }
    ]
  }
}
```

### 2. Create Prescription from Frontend

- **Method:** `POST`
- **Endpoint:** `/api/prescriptions/from-frontend`
- **Description:** Create a new prescription using frontend format
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "patientId": 101,
  "doctorId": 201,
  "prescriptionDate": "2025-08-15",
  "chiefComplaint": "Chest pain and shortness of breath",
  "onExamination": "Patient appears stable, mild tachycardia observed",
  "investigations": "ECG, Blood pressure monitoring",
  "advice": "Rest, avoid strenuous activities, follow-up in 1 week",
  "medicines": [
    {
      "name": "Aspirin",
      "nums": ["1", "0", "1"],
      "comment": "Take with food"
    },
    {
      "name": "Metoprolol",
      "nums": ["1", "0", "0"],
      "comment": "Monitor blood pressure"
    }
  ]
}
```

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescription created successfully",
  "data": {
    "id": 401,
    "patientId": 101,
    "doctorId": 201,
    "prescriptionDate": "2025-08-15",
    "chiefComplaint": "Chest pain and shortness of breath",
    "onExamination": "Patient appears stable, mild tachycardia observed",
    "investigations": "ECG, Blood pressure monitoring",
    "advice": "Rest, avoid strenuous activities, follow-up in 1 week",
    "medicines": [
      {
        "id": 501,
        "medicineName": "Aspirin",
        "morningDose": 1,
        "afternoonDose": 0,
        "eveningDose": 1,
        "comment": "Take with food"
      }
    ]
  }
}
```

### 3. Update Prescription

- **Method:** `PUT`
- **Endpoint:** `/api/prescriptions/{id}`
- **Description:** Update an existing prescription
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "patientId": 101,
  "doctorId": 201,
  "prescriptionDate": "2025-08-15",
  "chiefComplaint": "Updated chest pain description",
  "onExamination": "Patient condition improved",
  "investigations": "ECG, Blood tests completed",
  "advice": "Continue medication, follow-up in 2 weeks",
  "medicines": [
    {
      "medicineName": "Aspirin",
      "morningDose": 1,
      "afternoonDose": 0,
      "eveningDose": 1,
      "comment": "Take with food - updated"
    }
  ]
}
```

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescription updated successfully",
  "data": {
    "id": 401,
    "patientId": 101,
    "doctorId": 201,
    "prescriptionDate": "2025-08-15",
    "chiefComplaint": "Updated chest pain description",
    "onExamination": "Patient condition improved",
    "investigations": "ECG, Blood tests completed",
    "advice": "Continue medication, follow-up in 2 weeks"
  }
}
```

### 4. Update Prescription from Frontend

- **Method:** `PUT`
- **Endpoint:** `/api/prescriptions/{id}/from-frontend`
- **Description:** Update an existing prescription using frontend format
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "patientId": 101,
  "doctorId": 201,
  "prescriptionDate": "2025-08-15",
  "chiefComplaint": "Updated chest pain description",
  "onExamination": "Patient condition improved",
  "investigations": "ECG, Blood tests completed",
  "advice": "Continue medication, follow-up in 2 weeks",
  "medicines": [
    {
      "name": "Aspirin",
      "nums": ["1", "1", "1"],
      "comment": "Increased dosage - take with food"
    }
  ]
}
```

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescription updated successfully",
  "data": {
    "id": 401,
    "patientId": 101,
    "doctorId": 201,
    "prescriptionDate": "2025-08-15",
    "chiefComplaint": "Updated chest pain description",
    "medicines": [
      {
        "id": 501,
        "medicineName": "Aspirin",
        "morningDose": 1,
        "afternoonDose": 1,
        "eveningDose": 1,
        "comment": "Increased dosage - take with food"
      }
    ]
  }
}
```

### 5. Get All Prescriptions

- **Method:** `GET`
- **Endpoint:** `/api/prescriptions`
- **Description:** Retrieve all prescriptions
- **Authentication:** Not specified

**Sample Response:**

```json
[
  {
    "id": 401,
    "patientId": 101,
    "doctorId": 201,
    "prescriptionDate": "2025-08-15",
    "chiefComplaint": "Chest pain and shortness of breath",
    "onExamination": "Patient appears stable",
    "investigations": "ECG, Blood pressure monitoring",
    "advice": "Rest and follow-up",
    "medicines": []
  }
]
```

### 6. Get Prescription by ID

- **Method:** `GET`
- **Endpoint:** `/api/prescriptions/{id}`
- **Description:** Retrieve a specific prescription by ID
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescription found",
  "data": {
    "id": 401,
    "patientId": 101,
    "doctorId": 201,
    "prescriptionDate": "2025-08-15",
    "chiefComplaint": "Chest pain and shortness of breath",
    "onExamination": "Patient appears stable",
    "investigations": "ECG, Blood pressure monitoring",
    "advice": "Rest and follow-up",
    "medicines": [
      {
        "id": 501,
        "medicineName": "Aspirin",
        "morningDose": 1,
        "afternoonDose": 0,
        "eveningDose": 1,
        "comment": "Take with food"
      }
    ]
  }
}
```

### 7. Get Prescriptions by Patient ID

- **Method:** `GET`
- **Endpoint:** `/api/prescriptions/patient/{patientId}`
- **Description:** Retrieve all prescriptions for a specific patient
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescriptions retrieved successfully",
  "data": [
    {
      "id": 401,
      "patientId": 101,
      "doctorId": 201,
      "prescriptionDate": "2025-08-15",
      "chiefComplaint": "Chest pain",
      "medicines": []
    },
    {
      "id": 402,
      "patientId": 101,
      "doctorId": 202,
      "prescriptionDate": "2025-08-10",
      "chiefComplaint": "Headache",
      "medicines": []
    }
  ]
}
```

### 8. Get Prescriptions by Doctor ID

- **Method:** `GET`
- **Endpoint:** `/api/prescriptions/doctor/{doctorId}`
- **Description:** Retrieve all prescriptions created by a specific doctor
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescriptions retrieved successfully",
  "data": [
    {
      "id": 401,
      "patientId": 101,
      "doctorId": 201,
      "prescriptionDate": "2025-08-15",
      "chiefComplaint": "Chest pain",
      "medicines": []
    },
    {
      "id": 403,
      "patientId": 103,
      "doctorId": 201,
      "prescriptionDate": "2025-08-14",
      "chiefComplaint": "Hypertension",
      "medicines": []
    }
  ]
}
```

### 9. Get Prescriptions by Doctor with Patient Details

- **Method:** `GET`
- **Endpoint:** `/api/prescriptions/doctor/{doctorId}/with-patient-details`
- **Description:** Retrieve prescriptions by doctor with patient information included
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescriptions with patient details retrieved successfully",
  "data": [
    {
      "id": 401,
      "patientId": 101,
      "patientName": "Alice Johnson",
      "patientAge": 28,
      "patientGender": "Female",
      "patientPhoneNumber": "+1234567892",
      "doctorId": 201,
      "prescriptionDate": "2025-08-15",
      "chiefComplaint": "Chest pain and shortness of breath",
      "medicines": []
    }
  ]
}
```

### 10. Get Prescriptions by Patient and Doctor

- **Method:** `GET`
- **Endpoint:** `/api/prescriptions/patient/{patientId}/doctor/{doctorId}`
- **Description:** Retrieve prescriptions for a specific patient-doctor combination
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescriptions retrieved successfully",
  "data": [
    {
      "id": 401,
      "patientId": 101,
      "doctorId": 201,
      "prescriptionDate": "2025-08-15",
      "chiefComplaint": "Chest pain and shortness of breath",
      "medicines": []
    }
  ]
}
```

### 11. Delete Prescription

- **Method:** `DELETE`
- **Endpoint:** `/api/prescriptions/{id}`
- **Description:** Delete a specific prescription
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescription deleted successfully"
}
```

**Error Response:**

```json
{
  "error": "Prescription not found with ID: 999"
}
```

### 12. Get Prescription Medicines

- **Method:** `GET`
- **Endpoint:** `/api/prescriptions/{prescriptionId}/medicines`
- **Description:** Retrieve all medicines for a specific prescription
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "success": true,
  "message": "Prescription medicines retrieved successfully",
  "data": [
    {
      "id": 501,
      "medicineName": "Aspirin",
      "morningDose": 1,
      "afternoonDose": 0,
      "eveningDose": 1,
      "comment": "Take with food"
    },
    {
      "id": 502,
      "medicineName": "Metoprolol",
      "morningDose": 1,
      "afternoonDose": 0,
      "eveningDose": 0,
      "comment": "Monitor blood pressure"
    }
  ]
}
```

---

## Receptionist Management

### Base URL: `/api/receptionists`

### 1. Create Receptionist

- **Method:** `POST`
- **Endpoint:** `/api/receptionists`
- **Description:** Create a new receptionist user account
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "id": 601,
  "name": "Mary Johnson",
  "email": "mary.johnson@medix.com",
  "phoneNumber": "+1234567895",
  "password": "receptionistPassword123",
  "address": "456 Reception St, Admin Building"
}
```

**Sample Response:**

```json
{
  "id": 601,
  "name": "Mary Johnson",
  "email": "mary.johnson@medix.com",
  "phoneNumber": "+1234567895",
  "password": "receptionistPassword123",
  "address": "456 Reception St, Admin Building"
}
```

### 2. Get Receptionist by ID

- **Method:** `GET`
- **Endpoint:** `/api/receptionists/{id}`
- **Description:** Retrieve a specific receptionist by ID
- **Authentication:** Not specified

**Sample Response:**

```json
{
  "id": 601,
  "name": "Mary Johnson",
  "email": "mary.johnson@medix.com",
  "phoneNumber": "+1234567895",
  "password": "receptionistPassword123",
  "address": "456 Reception St, Admin Building"
}
```

### 3. Receptionist Login by Email

- **Method:** `POST`
- **Endpoint:** `/api/receptionists/by-email`
- **Description:** Authenticate receptionist using email and password
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "email": "mary.johnson@medix.com",
  "password": "receptionistPassword123"
}
```

**Sample Response (Success):**

```json
{
  "success": true,
  "message": "Receptionist found",
  "data": {
    "id": 601,
    "name": "Mary Johnson",
    "email": "mary.johnson@medix.com",
    "phoneNumber": "+1234567895",
    "address": "456 Reception St, Admin Building"
  }
}
```

**Sample Response (Error):**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 4. Update Receptionist Information

- **Method:** `PUT`
- **Endpoint:** `/api/receptionists/{id}`
- **Description:** Update receptionist's account information
- **Authentication:** Not specified

**Sample Request:**

```json
{
  "name": "Mary Johnson Updated",
  "email": "mary.johnson.updated@medix.com",
  "phoneNumber": "+1234567999",
  "password": "newReceptionistPassword123",
  "address": "Updated Address, New Admin Building"
}
```

**Sample Response:**

```json
{
  "id": 601,
  "name": "Mary Johnson Updated",
  "email": "mary.johnson.updated@medix.com",
  "phoneNumber": "+1234567999",
  "password": "newReceptionistPassword123",
  "address": "Updated Address, New Admin Building"
}
```

**Error Response:**

```json
{
  "error": "Receptionist not found with id: 999"
}
```

**Note:** All fields in the request are optional. Only provided fields will be updated.

---

## Error Handling

### Common Error Responses

**400 Bad Request:**

```json
{
  "error": "Validation error",
  "details": "Required field is missing"
}
```

**404 Not Found:**

```json
{
  "error": "Resource not found",
  "details": "Entity with ID 123 not found"
}
```

**500 Internal Server Error:**

```json
{
  "error": "Internal server error",
  "details": "Database connection failed"
}
```

## HTTP Status Codes Used

- `200 OK` - Successful GET, PUT operations
- `201 Created` - Successful POST operations
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication failed
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side errors

## Notes

1. **CORS Configuration:** All controllers are configured to accept requests from `http://localhost:3000`
2. **Date Format:** All dates use the format `YYYY-MM-DD` (ISO 8601)
3. **Authentication:** Currently, most endpoints do not require authentication (this may need to be implemented based on security requirements)
4. **Database:** The system uses MySQL database with JPA/Hibernate
5. **Validation:** Basic validation is implemented for required fields
6. **Prescription Medicines:** The `nums` array in frontend requests represents `[morning, afternoon, evening]` dosages

---

## Qualification Management

### Base URL: `/api/qualifications`

### 1. Create Qualification

- **Method:** `POST`
- **Endpoint:** `/api/qualifications`
- **Description:** Create a new qualification
- **Authentication:** Not required

**Request Body:**

```json
{
  "name": "Bachelor of Medicine"
}
```

**Sample Response (201 Created):**

```json
{
  "id": 1,
  "name": "Bachelor of Medicine"
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing name
{
  "error": "Qualification name is required"
}

// 409 Conflict - Duplicate name
{
  "error": "Qualification with this name already exists"
}
```

### 2. Get All Qualifications

- **Method:** `GET`
- **Endpoint:** `/api/qualifications`
- **Description:** Retrieve all qualifications
- **Authentication:** Not required

**Sample Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Bachelor of Medicine"
  },
  {
    "id": 2,
    "name": "Master of Surgery"
  },
  {
    "id": 3,
    "name": "Doctor of Medicine"
  }
]
```

### 3. Get Qualification by ID

- **Method:** `GET`
- **Endpoint:** `/api/qualifications/{id}`
- **Description:** Retrieve a specific qualification by ID
- **Authentication:** Not required

**Sample Response (200 OK):**

```json
{
  "id": 1,
  "name": "Bachelor of Medicine"
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Qualification not found",
  "id": 999
}
```

### 4. Update Qualification

- **Method:** `PUT`
- **Endpoint:** `/api/qualifications/{id}`
- **Description:** Update an existing qualification
- **Authentication:** Not required

**Request Body:**

```json
{
  "name": "Bachelor of Medicine and Surgery"
}
```

**Sample Response (200 OK):**

```json
{
  "id": 1,
  "name": "Bachelor of Medicine and Surgery"
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing name
{
  "error": "Qualification name is required"
}

// 404 Not Found
{
  "error": "Qualification not found with id: 999"
}

// 409 Conflict - Name already exists
{
  "error": "Qualification with this name already exists"
}
```

### 5. Delete Qualification

- **Method:** `DELETE`
- **Endpoint:** `/api/qualifications/{id}`
- **Description:** Delete a qualification by ID
- **Authentication:** Not required

**Sample Response (200 OK):**

```json
{
  "message": "Qualification deleted successfully",
  "id": 1
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Qualification not found with id: 999"
}
```

### 6. Check Qualification Exists by Name

- **Method:** `GET`
- **Endpoint:** `/api/qualifications/exists/{name}`
- **Description:** Check if a qualification exists by name
- **Authentication:** Not required

**Sample Response (200 OK):**

```json
{
  "exists": true,
  "name": "Bachelor of Medicine"
}
```

---

## Specialization Management

### Base URL: `/api/specializations`

### 1. Create Specialization

- **Method:** `POST`
- **Endpoint:** `/api/specializations`
- **Description:** Create a new specialization
- **Authentication:** Not required

**Request Body:**

```json
{
  "name": "Cardiology"
}
```

**Sample Response (201 Created):**

```json
{
  "id": 1,
  "name": "Cardiology"
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing name
{
  "error": "Specialization name is required"
}

// 409 Conflict - Duplicate name
{
  "error": "Specialization with this name already exists"
}
```

### 2. Get All Specializations

- **Method:** `GET`
- **Endpoint:** `/api/specializations`
- **Description:** Retrieve all specializations
- **Authentication:** Not required

**Sample Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Cardiology"
  },
  {
    "id": 2,
    "name": "Neurology"
  },
  {
    "id": 3,
    "name": "Orthopedics"
  }
]
```

### 3. Get Specialization by ID

- **Method:** `GET`
- **Endpoint:** `/api/specializations/{id}`
- **Description:** Retrieve a specific specialization by ID
- **Authentication:** Not required

**Sample Response (200 OK):**

```json
{
  "id": 1,
  "name": "Cardiology"
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Specialization not found",
  "id": 999
}
```

### 4. Update Specialization

- **Method:** `PUT`
- **Endpoint:** `/api/specializations/{id}`
- **Description:** Update an existing specialization
- **Authentication:** Not required

**Request Body:**

```json
{
  "name": "Interventional Cardiology"
}
```

**Sample Response (200 OK):**

```json
{
  "id": 1,
  "name": "Interventional Cardiology"
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing name
{
  "error": "Specialization name is required"
}

// 404 Not Found
{
  "error": "Specialization not found with id: 999"
}

// 409 Conflict - Name already exists
{
  "error": "Specialization with this name already exists"
}
```

### 5. Delete Specialization

- **Method:** `DELETE`
- **Endpoint:** `/api/specializations/{id}`
- **Description:** Delete a specialization by ID
- **Authentication:** Not required

**Sample Response (200 OK):**

```json
{
  "message": "Specialization deleted successfully",
  "id": 1
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Specialization not found with id: 999"
}
```

### 6. Check Specialization Exists by Name

- **Method:** `GET`
- **Endpoint:** `/api/specializations/exists/{name}`
- **Description:** Check if a specialization exists by name
- **Authentication:** Not required

**Sample Response (200 OK):**

```json
{
  "exists": true,
  "name": "Cardiology"
}
```
