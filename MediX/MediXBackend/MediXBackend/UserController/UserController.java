package com.Backend.MediXBackend.UserController;

import com.Backend.MediXBackend.User.User;
import com.Backend.MediXBackend.UserRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}
