package com.spring.orion_backend.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="user_id")
    private String userId;

    private String name;

    private String surname;
    private String email;

    private String password;
    private Instant createdDataTime;
    private String role;
}
