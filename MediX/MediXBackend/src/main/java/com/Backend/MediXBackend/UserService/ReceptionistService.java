package com.Backend.MediXBackend.UserService;

import com.Backend.MediXBackend.User.User;
import com.Backend.MediXBackend.UserRepository.ReceptionistRepository;
import com.Backend.MediXBackend.UserRepository.UserRepository;
import com.Backend.MediXBackend.Utils.IdGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ReceptionistService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ReceptionistRepository receptionistRepo;

    @Autowired
    private IdGeneratorService idGenService;

    @Transactional
    public User createReceptionist(User user) {
        // Generate custom receptionist ID
        Long customId = idGenService.generateReceptionistId();
        user.setId(customId);
        return userRepo.save(user);
    }

    public Optional<User> getReceptionistById(Long id) {
        return userRepo.findById(id);
    }

    public Optional<User> getReceptionistByEmailAndPassword(String email, String password) {
        Optional<User> userOpt = userRepo.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return userOpt;
        }
        return Optional.empty();
    }

}