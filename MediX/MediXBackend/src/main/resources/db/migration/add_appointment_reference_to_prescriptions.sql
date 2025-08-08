-- Add appointment_id foreign key to prescriptions table
-- This allows prescriptions to be linked to appointments (optional relationship)

ALTER TABLE prescriptions 
ADD COLUMN appointment_id BIGINT NULL,
ADD CONSTRAINT fk_prescriptions_appointment 
    FOREIGN KEY (appointment_id) 
    REFERENCES appointment(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- Create index for better query performance
CREATE INDEX idx_prescriptions_appointment_id ON prescriptions(appointment_id);

-- Add comment to document the purpose
ALTER TABLE prescriptions 
MODIFY COLUMN appointment_id BIGINT NULL 
COMMENT 'Foreign key reference to appointment table. Can be NULL for prescriptions without appointments.';
