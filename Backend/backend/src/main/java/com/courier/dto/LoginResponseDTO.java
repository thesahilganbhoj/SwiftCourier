package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private boolean success;
    private String message;
    private String role; // CUSTOMER | STAFF | ADMIN
    private Long userId;
    private String name;
}
