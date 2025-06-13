package com.Backend.MediXBackend.Utils;

import com.Backend.MediXBackend.UserRepository.DoctorRepository;
import com.Backend.MediXBackend.UserRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;

@Service
public class IdGeneratorService {

    @Autowired
    private DoctorRepository doctorRepo;

    public synchronized Long generateDoctorUserId(int professionCode) {
        int year = Year.now().getValue() % 100;  // e.g., 2025 → 25

        // Get max existing doctor ID
        Long maxId = doctorRepo.findMaxDoctorId().orElse(0L);

        // Extract the serial part from the max ID (last 3 digits)
        int nextSerial = 1;
        if (maxId != 0L) {
            String maxIdStr = String.valueOf(maxId);
            if (maxIdStr.length() >= 7) {
                int serial = Integer.parseInt(maxIdStr.substring(maxIdStr.length() - 3));
                nextSerial = serial + 1;
            }
        }

        // Build ID: yy + professionCode + serial (e.g., 25 + 01 + 001)
        return Long.parseLong(String.format("%02d%02d%03d", year, professionCode, nextSerial));
    }
}
