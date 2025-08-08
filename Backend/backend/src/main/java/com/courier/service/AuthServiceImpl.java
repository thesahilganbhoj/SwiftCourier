package com.courier.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.courier.dto.ApiResponse;
import com.courier.dto.CustomerDTO;
import com.courier.dto.CustomerRegisterDTO;
import com.courier.dto.LoginRequestDTO;
import com.courier.dto.LoginResponseDTO;
import com.courier.entities.Admin;
import com.courier.entities.Customer;
import com.courier.entities.Staff;
import com.courier.repository.AdminRepository;
import com.courier.repository.CustomerRepository;
import com.courier.repository.StaffRepository;
import com.courier.util.PasswordUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final CustomerRepository customerRepository;
    private final StaffRepository staffRepository;
    private final AdminRepository adminRepository;

    @Override
    @Transactional
    public ApiResponse<?> registerCustomer(CustomerRegisterDTO dto) {
        // Ensure email is unique across all roles (optional but safer)
        if (customerRepository.existsByEmail(dto.getEmail())
                || staffRepository.existsByEmail(dto.getEmail())
                || adminRepository.findByEmail(dto.getEmail()).isPresent()) {
            return new ApiResponse<>("Email already in use", null);
        }

        Customer c = new Customer();
        c.setName(dto.getName());
        c.setEmail(dto.getEmail());
        c.setPassword(PasswordUtil.sha256(dto.getPassword()));
        c.setContactNumber(dto.getContactNumber());
        c.setAddress(dto.getAddress());
        Customer saved = customerRepository.save(c);

        CustomerDTO response = new CustomerDTO(
                saved.getCustomerId(),
                saved.getName(),
                saved.getEmail(),
                saved.getContactNumber(),
                saved.getAddress()
        );
        return new ApiResponse<>("Registration successful", response);
    }

    @Override
    @Transactional(readOnly = true)
    public LoginResponseDTO login(LoginRequestDTO dto) {
        String role = dto.getRole() == null ? "" : dto.getRole().trim().toUpperCase();
        String rawPassword = dto.getPassword();
        String hashed = PasswordUtil.sha256(rawPassword);

        switch (role) {
            case "CUSTOMER": {
                Optional<Customer> custOpt = customerRepository.findByEmail(dto.getEmail());
                if (custOpt.isPresent() && safeEquals(custOpt.get().getPassword(), hashed)) {
                    Customer c = custOpt.get();
                    return new LoginResponseDTO(true, "Login successful", "CUSTOMER", c.getCustomerId(), c.getName());
                }
                break;
            }
            case "STAFF": {
                Optional<Staff> staffOpt = staffRepository.findByEmail(dto.getEmail());
                if (staffOpt.isPresent() && safeEquals(staffOpt.get().getPassword(), hashed)) {
                    Staff s = staffOpt.get();
                    return new LoginResponseDTO(true, "Login successful", "STAFF", s.getStaffId(), s.getName());
                }
                break;
            }
            case "ADMIN": {
                Optional<Admin> adminOpt = adminRepository.findByEmail(dto.getEmail());
                if (adminOpt.isPresent() && rawPassword.equals(adminOpt.get().getPassword())) {
                    Admin a = adminOpt.get();
                    return new LoginResponseDTO(true, "Login successful", "ADMIN", a.getAdminId(), a.getName());
                }
                break;
            }
            default:
                return new LoginResponseDTO(false, "Invalid role", role, null, null);
        }
        return new LoginResponseDTO(false, "Incorrect credentials", role, null, null);
    }

    private boolean safeEquals(String a, String b) {
        if (a == null || b == null) return false;
        if (a.length() != b.length()) return false;
        int res = 0;
        for (int i = 0; i < a.length(); i++) {
            res |= a.charAt(i) ^ b.charAt(i);
        }
        return res == 0;
    }
}
