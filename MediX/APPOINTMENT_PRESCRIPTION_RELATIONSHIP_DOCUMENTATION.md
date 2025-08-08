# MediX Appointment-Prescription Relationship Documentation

## Overview

This document describes the implementation of the appointment-prescription relationship in the MediX system. The relationship allows prescriptions to be optionally linked to appointments while maintaining the flexibility for standalone prescriptions.

## Database Schema Changes

### Modified Tables

#### prescriptions table

The `prescriptions` table has been enhanced with a new foreign key relationship:

| Column         | Type   | Constraints       | Description                             |
| -------------- | ------ | ----------------- | --------------------------------------- |
| appointment_id | BIGINT | NULL, FOREIGN KEY | Optional reference to appointment table |

**Foreign Key Constraint:**

- `fk_prescriptions_appointment` references `appointment(id)`
- `ON DELETE SET NULL` - If appointment is deleted, prescription remains but appointment_id becomes NULL
- `ON UPDATE CASCADE` - Updates cascade from appointment to prescription

**Index:**

- `idx_prescriptions_appointment_id` - Optimizes queries filtering by appointment_id

## Backend Implementation

### 1. Entity Changes

#### Prescription.java

```java
@Column(name = "appointment_id")
private Long appointmentId;

// Getter and setter methods added
public Long getAppointmentId() { return appointmentId; }
public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }
```

#### PrescriptionRequest.java

```java
private Long appointmentId;

// Getter and setter methods added
public Long getAppointmentId() { return appointmentId; }
public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }
```

#### PrescriptionWithPatientDetails.java

```java
private Long appointmentId;

// Updated constructor and getter/setter methods
public Long getAppointmentId() { return appointmentId; }
public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }
```

### 2. Repository Changes

#### PrescriptionRepository.java

```java
// New method to find prescriptions by appointment ID
List<Prescription> findByAppointmentIdOrderByPrescriptionDateDesc(Long appointmentId);
```

### 3. Service Layer Changes

#### PrescriptionService.java

**New Methods:**

- `getPrescriptionsByAppointmentId(Long appointmentId)` - Get all prescriptions for an appointment
- `linkPrescriptionToAppointment(Long prescriptionId, Long appointmentId)` - Link existing prescription to appointment
- `unlinkPrescriptionFromAppointment(Long prescriptionId)` - Remove appointment link from prescription

### 4. Controller Changes

#### PrescriptionController.java

**New API Endpoints:**

##### GET /api/prescriptions/appointment/{appointmentId}

Get all prescriptions linked to a specific appointment.

**Response:**

```json
{
  "success": true,
  "message": "Prescriptions retrieved successfully",
  "data": [
    {
      "id": 1,
      "patientId": 123,
      "doctorId": 456,
      "appointmentId": 789,
      "prescriptionDate": "2025-08-08",
      "chiefComplaint": "Headache",
      "onExamination": "Normal vitals",
      "investigations": "Blood test",
      "advice": "Rest and medication",
      "medicines": [...]
    }
  ]
}
```

##### PUT /api/prescriptions/{prescriptionId}/link-appointment/{appointmentId}

Link an existing prescription to an appointment.

**Response:**

```json
{
  "success": true,
  "message": "Prescription linked to appointment successfully",
  "data": {
    "id": 1,
    "appointmentId": 789,
    ...
  }
}
```

##### PUT /api/prescriptions/{prescriptionId}/unlink-appointment

Remove the appointment link from a prescription.

**Response:**

```json
{
  "success": true,
  "message": "Prescription unlinked from appointment successfully",
  "data": {
    "id": 1,
    "appointmentId": null,
    ...
  }
}
```

## Usage Scenarios

### 1. Creating Prescription with Appointment Reference

When creating a prescription that's linked to an appointment:

```javascript
// Frontend request
{
  "patientId": 123,
  "doctorId": 456,
  "appointmentId": 789,  // Optional - can be null
  "prescriptionDate": "2025-08-08",
  "chiefComplaint": "Patient complains of headache",
  "onExamination": "Blood pressure normal, temperature 98.6°F",
  "investigations": "Recommend blood test",
  "advice": "Take rest, drink plenty of water",
  "medicines": [
    {
      "name": "Paracetamol",
      "nums": ["1", "0", "1"],
      "comment": "After meals"
    }
  ]
}
```

### 2. Creating Standalone Prescription

For prescriptions not linked to any appointment:

```javascript
// Frontend request (appointmentId omitted or null)
{
  "patientId": 123,
  "doctorId": 456,
  "appointmentId": null,  // Or omit this field entirely
  "prescriptionDate": "2025-08-08",
  // ... rest of the prescription data
}
```

### 3. Linking Existing Prescription to Appointment

```javascript
// PUT request to /api/prescriptions/1/link-appointment/789
// No body required - IDs are in the URL
```

### 4. Getting All Prescriptions for an Appointment

```javascript
// GET request to /api/prescriptions/appointment/789
// Returns array of all prescriptions linked to appointment 789
```

## Database Relationships

```
appointment (1) ←--→ (0..N) prescriptions
     ↓                        ↓
    id                 appointment_id (FK, nullable)
  patient_id               patient_id
  doctor_id               doctor_id
  appointment_date        prescription_date
  status                  clinical_notes
                         medicines
```

## Benefits

1. **Flexible Design**: Prescriptions can exist with or without appointment references
2. **Data Integrity**: Foreign key constraints ensure referential integrity
3. **Performance**: Indexed appointment_id field for fast queries
4. **Backward Compatibility**: Existing prescriptions continue to work
5. **Complete Workflow**: Supports full appointment-to-prescription workflow
6. **Easy Reporting**: Query prescriptions by appointment for comprehensive patient records

## API Usage Examples

### Create prescription with appointment link

```http
POST /api/prescriptions/from-frontend
Content-Type: application/json

{
  "patientId": 123,
  "doctorId": 456,
  "appointmentId": 789,
  "prescriptionDate": "2025-08-08",
  "chiefComplaint": "Fever and cough",
  "medicines": [...]
}
```

### Get all prescriptions for appointment

```http
GET /api/prescriptions/appointment/789
```

### Link existing prescription to appointment

```http
PUT /api/prescriptions/1/link-appointment/789
```

### Unlink prescription from appointment

```http
PUT /api/prescriptions/1/unlink-appointment
```

## Testing

To test the new functionality:

1. **Create appointment** using existing appointment API
2. **Create prescription with appointment reference** using the enhanced prescription API
3. **Query prescriptions by appointment ID** to verify the relationship
4. **Test linking/unlinking** existing prescriptions to appointments
5. **Verify data integrity** when appointments are deleted (prescription should remain with null appointment_id)

## Migration

The database migration is automatic when the SQL script is executed. All existing prescriptions will have `appointment_id` set to `NULL`, maintaining backward compatibility.

---

_This enhancement provides a comprehensive solution for linking prescriptions to appointments while maintaining system flexibility and data integrity._
