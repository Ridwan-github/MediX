package com.Backend.MediXBackend.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;

@Entity
public class User {
    @Id
    private Integer id;

    private String name;
    private String email;
    private String phoneNumber;
    private String password;
    private String address;
}
