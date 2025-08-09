package com.spring.orion_backend.settings;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Setter
@Getter
@Entity
@Table(name = "settings")
public class Setting {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "operating_hours_start")
    private LocalTime operatingHoursStart;

    @Column(name="operating_hours_end")
    private LocalTime operatingHoursEnd;

    private Integer pricePerHour;

    private Integer vat;

    @Column(name = "stripe_public_key")
    private String stripePublicKey;

    @Column(name = "stripe_private_key")
    private String stripePrivateKey;

    @Column(name = "require_digit_password")
    private Boolean requireDigitPassword;

    @Column(name = "require_special_char_password")
    private Boolean requireSpecialCharPassword;

    @Column(name = "min_length_password")
    private Integer minLengthPassword;

    @Column(name = "failed_login_attempts")
    private Integer failedLoginAttempts;
}
