package com.courier.service;

import com.courier.dto.CustomerRegisterDTO;
import com.courier.dto.LoginRequestDTO;
import com.courier.dto.LoginResponseDTO;
import com.courier.dto.ApiResponse;

public interface AuthService {
    ApiResponse<?> registerCustomer(CustomerRegisterDTO dto);
    LoginResponseDTO login(LoginRequestDTO dto);
}
