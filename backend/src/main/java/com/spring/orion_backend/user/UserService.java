package com.spring.orion_backend.user;

import com.spring.orion_backend.exception.ResourceNotFoundException;
import com.spring.orion_backend.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Email alredy in use.");
        }

        User user = new User();

        if(!request.getName().isEmpty()) {
            user.setName(request.getName());
        }

        if(!request.getSurname().isEmpty()) {
            user.setSurname(request.getSurname());
        }

        if(!request.getEmail().isEmpty()) {
            user.setEmail(request.getEmail());
        }

        if(!request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        Date date = new Date();
        user.setCreatedDataTime(date.toInstant());

        if(Objects.equals(request.getRole(), "Admin")) {
            user.setRole(request.getRole());
        } else {
            user.setRole("User");
        }

        return userRepository.save(user);
    }

    public User updateUser(User userNewData) {
        User user = userRepository.findUserByUserId(userNewData.getUserId());

        user.setName(userNewData.getName());
        user.setSurname(userNewData.getSurname());
        user.setEmail(userNewData.getEmail());
        user.setPassword(userNewData.getPassword());
        user.setRole(userNewData.getRole());

        return userRepository.save(user);
    }

    public void deleteUser(String userId) {
        User user = userRepository.findUserByUserId(userId);

        System.out.println(userId);
        System.out.println(user.getUserId());

        userRepository.delete(user);
    }

    public void updatePassword(PasswordRequest request) {
        if(!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new ValidationException("Passwords do not match.");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));;

        if (passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new ValidationException("Incorrect current password.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public User authUser(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if(userOptional.isEmpty()) {
            return null;
        }


        User user = userOptional.get();
        if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return user;
        } else {
            return null;
        }
    }

}
