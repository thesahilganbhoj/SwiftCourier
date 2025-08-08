package com.courier.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.courier.dto.CustomerRegisterDTO;
import com.courier.dto.LoginRequestDTO;
import com.courier.dto.LoginResponseDTO;
import com.courier.dto.ApiResponse;
import com.courier.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@CrossOrigin(
  origins = "http://localhost:5173",
  methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS },
  allowedHeaders = "*"
)
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<ApiResponse<?>> registerCustomer(@Valid @RequestBody CustomerRegisterDTO dto) {
      return ResponseEntity.ok(authService.registerCustomer(dto));
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
      LoginResponseDTO res = authService.login(dto);
      return ResponseEntity.ok(res);
  }
}
