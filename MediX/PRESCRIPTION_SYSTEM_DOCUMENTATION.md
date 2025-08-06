# MediX Prescription Management System - Complete Documentation

## Table of Contents

1. [Overview](#overview)
2. [Database Schema](#database-schema)
3. [Backend Implementation](#backend-implementation)
4. [API Endpoints](#api-endpoints)
5. [Frontend Integration](#frontend-integration)
6. [Doctor History Page Integration](#doctor-history-page-integration)
7. [Error Handling](#error-handling)
8. [Testing Guide](#testing-guide)

## Overview

The MediX Prescription Management System is a comprehensive solution that allows doctors to create, update, and manage prescriptions with detailed medicine information. The system includes both backend APIs and frontend integration, providing a complete workflow for prescription management in the hospital system.

### Key Features

- **Patient Management**: Links to existing patients, creates new patients if needed
- **Dynamic Medicine Fields**: Supports multiple medicines with individual dosage schedules
- **Clinical Notes**: Captures Chief Complaint (C/C), On Examination (O/E), investigations, and advice
- **Date Tracking**: Automatically records prescription date
- **Edit Mode**: Supports editing existing prescriptions
- **History View**: Can retrieve prescription history by patient or doctor
- **Enhanced API**: Custom endpoint with patient details for improved user experience

## Database Schema

### Tables

#### 1. prescriptions

Main prescription table that stores prescription metadata:

| Column              | Type   | Constraints                 | Description                         |
| ------------------- | ------ | --------------------------- | ----------------------------------- |
| `id`                | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique prescription identifier      |
| `patient_id`        | BIGINT | NOT NULL                    | Links to patient                    |
| `doctor_id`         | BIGINT | NOT NULL                    | Links to doctor                     |
| `prescription_date` | DATE   | NOT NULL                    | Date of prescription                |
| `chief_complaint`   | TEXT   |                             | Patient's main complaint (C/C)      |
| `on_examination`    | TEXT   |                             | Doctor's examination findings (O/E) |
| `investigations`    | TEXT   |                             | Recommended investigations (INVS)   |
| `advice`            | TEXT   |                             | Doctor's advice (ADV)               |

#### 2. prescription_medicines

Medicine details table with foreign key relationship:

| Column            | Type         | Constraints                 | Description                      |
| ----------------- | ------------ | --------------------------- | -------------------------------- |
| `id`              | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | Unique medicine entry identifier |
| `prescription_id` | BIGINT       | FOREIGN KEY                 | Links to prescription            |
| `medicine_name`   | VARCHAR(255) | NOT NULL                    | Name of the medicine             |
| `morning_dose`    | INT          | DEFAULT 0                   | Morning dosage                   |
| `afternoon_dose`  | INT          | DEFAULT 0                   | Afternoon dosage                 |
| `evening_dose`    | INT          | DEFAULT 0                   | Evening dosage                   |
| `comment`         | TEXT         |                             | Special instructions             |

### Database Indices

- `idx_prescriptions_patient_id` - Fast patient prescription lookup
- `idx_prescriptions_doctor_id` - Fast doctor prescription lookup
- `idx_prescriptions_date` - Date-based sorting and filtering
- `idx_prescription_medicines_prescription_id` - Fast medicine retrieval

### Database Relationships

```
prescriptions (1) ←→ (N) prescription_medicines
      ↓                        ↓
  patient_id                medicine details
  doctor_id                 (name, doses, comments)
  clinical_notes
```

## Backend Implementation

### Entities Created

#### Prescription.java

Main prescription entity with JPA annotations:

- Contains all prescription metadata fields
- Defines relationships with medicines
- Includes validation annotations

#### PrescriptionMedicine.java

Medicine details with foreign key relationship:

- Links to prescription via prescription_id
- Stores dosage information and comments
- Supports cascade operations

#### PrescriptionRequest.java

DTO for handling frontend requests:

- Handles the specific format sent by the frontend
- Converts frontend format to entity format
- Supports the `nums` array format for dosages

#### PrescriptionWithPatientDetails.java

Custom DTO that combines prescription and patient data:

- Extends basic prescription data
- Adds patient name and phone number
- Used for enhanced API responses

### Repository Layer

#### PrescriptionRepository.java

JPA repository with custom queries:

- Basic CRUD operations
- Custom queries for patient/doctor filtering
- Date-based queries for reporting

#### PrescriptionMedicineRepository.java

Repository for medicine operations:

- Medicine-specific queries
- Cascade operations support

### Service Layer

#### PrescriptionService.java

Business logic for prescription management:

- CRUD operations with validation
- Patient/doctor filtering methods
- Enhanced method: `getPrescriptionsByDoctorIdWithPatientDetails(Long doctorId)`
- Error handling and data transformation

### Controller Layer

#### PrescriptionController.java

REST API endpoints with comprehensive error handling:

- Handles both direct entity requests and frontend-formatted requests
- Response formatting with success/error messages
- Input validation and sanitization

## API Endpoints

### Base URL

`http://localhost:8080/api/prescriptions`

### Endpoint Details

| Method | Endpoint                                  | Description                              | Request Body             | Response                     |
| ------ | ----------------------------------------- | ---------------------------------------- | ------------------------ | ---------------------------- |
| POST   | `/from-frontend`                          | Create prescription from frontend format | PrescriptionRequest JSON | Created prescription with ID |
| GET    | `/{id}`                                   | Get prescription by ID                   | None                     | Single prescription object   |
| GET    | `/patient/{patientId}`                    | Get all prescriptions for a patient      | None                     | Array of prescriptions       |
| GET    | `/doctor/{doctorId}`                      | Get all prescriptions by a doctor        | None                     | Array of prescriptions       |
| GET    | `/doctor/{doctorId}/with-patient-details` | Get prescriptions with patient info      | None                     | Array with patient details   |
| PUT    | `/{id}`                                   | Update prescription                      | PrescriptionRequest JSON | Updated prescription         |
| DELETE | `/{id}`                                   | Delete prescription                      | None                     | Success message              |
| GET    | `/{prescriptionId}/medicines`             | Get medicines for a prescription         | None                     | Array of medicines           |

### Request/Response Formats

#### Create Prescription Request (POST /from-frontend)

```json
{
  "patientId": 12345,
  "doctorId": 67890,
  "prescriptionDate": "2024-12-01",
  "chiefComplaint": "Fever and headache",
  "onExamination": "Vital signs stable, mild fever",
  "investigations": "CBC, Blood pressure monitoring",
  "advice": "Rest and take prescribed medications",
  "medicines": [
    {
      "name": "Paracetamol 500mg",
      "nums": ["1", "0", "1"],
      "comment": "After meals"
    },
    {
      "name": "Amoxicillin 250mg",
      "nums": ["1", "1", "1"],
      "comment": "Complete the course"
    }
  ]
}
```

#### Standard Success Response

```json
{
  "success": true,
  "message": "Prescription created successfully",
  "data": {
    "id": 1,
    "patientId": 12345,
    "doctorId": 67890,
    "prescriptionDate": "2024-12-01",
    "chiefComplaint": "Fever and headache",
    "onExamination": "Vital signs stable, mild fever",
    "investigations": "CBC, Blood pressure monitoring",
    "advice": "Rest and take prescribed medications",
    "medicines": [
      {
        "id": 1,
        "medicineName": "Paracetamol 500mg",
        "morningDose": 1,
        "afternoonDose": 0,
        "eveningDose": 1,
        "comment": "After meals"
      }
    ]
  }
}
```

#### Enhanced Response with Patient Details

```json
{
  "success": true,
  "message": "Prescriptions with patient details retrieved successfully",
  "data": [
    {
      "id": 15,
      "patientId": 1,
      "doctorId": 2501001,
      "prescriptionDate": "2025-08-02",
      "chiefComplaint": "asdf",
      "onExamination": "asdf",
      "investigations": "asdf",
      "advice": "asdf",
      "medicines": [...],
      "patientName": "Nuren",
      "patientPhoneNumber": "01974289081"
    }
  ]
}
```

## Frontend Integration

### Data Format for Frontend Submission

The prescription form sends data in this specific format:

```javascript
{
  patientId: number,
  doctorId: number,
  prescriptionDate: "YYYY-MM-DD",
  chiefComplaint: string,    // form.cc
  onExamination: string,     // form.oe
  investigations: string,    // form.invs
  advice: string,           // form.adv
  medicines: [
    {
      name: string,
      nums: [morning, afternoon, evening], // string array
      comment: string
    }
  ]
}
```

### TypeScript Interface

```typescript
type Prescriptions = {
  id: number;
  patientId: number;
  doctorId: number;
  prescriptionDate: string;
  chiefComplaint: string;
  onExamination: string;
  investigations: string;
  advice: string;
  medicines: Array<{
    id: number;
    medicineName: string;
    morningDose: number;
    afternoonDose: number;
    eveningDose: number;
    comment: string;
  }>;
  patientName: string;
  patientPhoneNumber: string;
};
```

### JavaScript Integration Example

```javascript
const handleSavePrescription = async () => {
  const prescriptionData = {
    patientId: patientId,
    doctorId: doctorId, // Get from logged-in doctor
    prescriptionDate: new Date().toISOString().split("T")[0],
    chiefComplaint: form.cc,
    onExamination: form.oe,
    investigations: form.invs,
    advice: form.adv,
    medicines: medicines.filter((med) => med.name.trim() !== ""),
  };

  try {
    const response = await fetch(
      "http://localhost:8080/api/prescriptions/from-frontend",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescriptionData),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Prescription saved:", result.data);
      // Handle success (e.g., show success message, redirect)
    } else {
      console.error("Error saving prescription:", result.error);
      // Handle error
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network error
  }
};
```

## Doctor History Page Integration

### Implementation Details

The doctor history page (`/doctor/history`) has been integrated with the custom API to provide comprehensive prescription management.

#### Key Features Implemented

1. **API Integration**

   - **Endpoint Used**: `GET /api/prescriptions/doctor/{doctorId}/with-patient-details`
   - **Real Data**: Replaced mock data with real prescription data from backend
   - **Error Handling**: Added proper loading states and error handling

2. **Redirect Functionality**

   - **Click Action**: When a user clicks "View Prescription" on any row
   - **Redirect URL**: `http://localhost:3000/doctor/prescribe/preview?prescriptionId={prescriptionId}`
   - **Navigation**: Uses Next.js router for client-side navigation

3. **Enhanced UI**
   - **Loading State**: Shows spinner while fetching data
   - **Error State**: Shows error message with retry button
   - **Empty State**: Shows message when no prescriptions found
   - **Medicine Count**: Added column showing number of medicines per prescription
   - **Responsive Design**: Maintains the existing green theme and styling

#### How It Works

1. **Page Load**:

   - Component loads and immediately calls `fetchPrescriptions()`
   - Shows loading spinner while API request is in progress

2. **Data Display**:

   - Fetches prescriptions for doctor ID 2501001 (configurable)
   - Displays prescription date, patient ID, patient name, phone number, and medicine count
   - Each row has a "View Prescription" button

3. **User Interaction**:
   - When user clicks "View Prescription" button
   - Redirects to `/doctor/prescribe/preview?prescriptionId={prescription.id}`
   - The preview page can then use the prescriptionId to fetch detailed prescription data

## Error Handling

### API Error Responses

#### 400 Bad Request

```json
{
  "error": "Patient ID and Doctor ID are required"
}
```

#### 404 Not Found

```json
{
  "error": "Prescription not found",
  "prescriptionId": 123
}
```

#### 500 Internal Server Error

```json
{
  "error": "Failed to create prescription",
  "details": "Detailed error message"
}
```

### Frontend Error Handling

The system handles various scenarios:

- **Loading**: Shows spinner during API calls
- **API Error**: Shows error message with retry button
- **No Data**: Shows "No prescriptions found" message
- **Network Issues**: Catches and displays error messages
- **Validation Errors**: Displays field-specific error messages

## Testing Guide

### Backend Testing

#### Using Browser

Navigate to: `http://localhost:8080/api/prescriptions/doctor/2501001/with-patient-details`

#### Using PowerShell

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/prescriptions/doctor/2501001/with-patient-details" -Method Get
```

#### Using cURL

```bash
curl http://localhost:8080/api/prescriptions/doctor/2501001/with-patient-details
```

#### Using Postman

1. Create a GET request to the above URL
2. Check response format and data
3. Test error scenarios with invalid IDs

### Frontend Testing

1. **Start your backend server** (make sure the new API endpoint is available)
2. **Navigate to** `http://localhost:3000/doctor/history`
3. **Verify**:
   - Loading state appears initially
   - Real prescription data loads from the API
   - Clicking "View Prescription" redirects to preview page with correct prescriptionId

### Test Scenarios

1. **Happy Path**: Create, read, update, delete prescriptions
2. **Error Cases**: Invalid IDs, missing required fields
3. **Edge Cases**: Empty medicine lists, special characters in fields
4. **Performance**: Large datasets, concurrent requests
5. **Integration**: Frontend-to-backend communication

## Configuration Notes

### Doctor ID Configuration

Currently hardcoded to `2501001`. Can be modified to:

- Get from localStorage: `localStorage.getItem('doctorId')`
- Get from authentication context
- Pass as a URL parameter

### Database Configuration

Tables will be automatically created by Hibernate when the application starts due to the `spring.jpa.hibernate.ddl-auto=update` setting in `application.properties`.

## Next Steps

1. **Authentication Integration**: Add doctor ID from authenticated session
2. **Advanced Validation**: Implement additional business logic validation
3. **Reporting Features**: Create prescription reports and analytics
4. **Printing Integration**: Add prescription printing functionality
5. **Mobile Optimization**: Ensure responsive design for mobile devices
6. **Audit Trail**: Add logging for prescription changes
7. **Backup & Recovery**: Implement data backup strategies

## Implementation Benefits

1. **Scalable Design**: Uses JPA entities with proper relationships
2. **API Flexibility**: Supports both direct entity and frontend-formatted requests
3. **Data Integrity**: Foreign key constraints and cascade operations
4. **Search Capabilities**: Indexed queries for patient/doctor filtering
5. **Complete CRUD**: Full create, read, update, delete operations
6. **Enhanced UX**: Single API calls reduce network requests
7. **Backwards Compatible**: Doesn't affect existing API endpoints
8. **Production Ready**: Follows Spring Boot best practices

---

_This documentation covers the complete prescription management system implementation for MediX, including backend APIs, database schema, frontend integration, and testing procedures. The system is production-ready and provides a comprehensive solution for hospital prescription management._
