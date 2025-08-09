package com.spring.orion_backend.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordRequest {
    private String email;
    private String currentPassword;
    private String newPassword;
    private String confirmNewPassword;
}
