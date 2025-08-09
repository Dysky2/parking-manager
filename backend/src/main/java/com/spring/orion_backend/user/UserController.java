package com.spring.orion_backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200" , allowedHeaders = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {return userRepository.findUserByUserId(id); }

    @PostMapping("/createUser")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/updateUser")
    public User updateUser(@RequestBody User user) {return userService.updateUser(user); }

    @DeleteMapping("/delete/{userId}")
    public void deleteUser(@PathVariable String userId) { userService.deleteUser(userId); }

    @PostMapping("/login")
    public ResponseEntity<User> canUserLogIn(@RequestBody LoginRequest loginRequest) {
        User authenticatedUser = userService.authUser(loginRequest);

        if(authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

//    @PostMapping("/login")
//    public User canUserLogIn(@RequestBody LoginRequest loginRequest) {return userRepository.getUserByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword()); }

    @PostMapping("/isExist")
    public Boolean isUserExist(@RequestBody LoginRequest loginRequest) {
        return userRepository.existsByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
    }

//    @PostMapping("/isExist")
//    public Boolean isUserExist(@RequestBody LoginRequest loginRequest) {
//        return userRepository.existsByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
//    }

    @PostMapping("/updatePassword")
    public ResponseEntity<Map<String, String>> updatePassword(@RequestBody PasswordRequest passwordRequest) {
        userService.updatePassword(passwordRequest);

        Map<String, String> response = Map.of("message", "Password changed successfully.");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/getLoggedUser")
    public User getUser(@RequestBody User user) {
        return userRepository.getUserByEmailAndPassword(user.getEmail(), user.getPassword());
    }
}
