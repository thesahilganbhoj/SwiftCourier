package com.courier.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.courier.entities.Feedback;
import com.courier.dto.ApiResponse;
import com.courier.dto.CustomerDTO;
import com.courier.service.CustomerService;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class CustomerController {

	private final CustomerService customerService;

	@PostMapping("/feedback")
	public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
	    feedback.setCreatedAt(LocalDateTime.now());
	    Feedback savedFeedback = customerService.saveFeedback(feedback);
	    return ResponseEntity.status(HttpStatus.CREATED)
	                         .body(new ApiResponse<>("Feedback submitted successfully", savedFeedback));
	}

	// Get customer profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomerProfile(@PathVariable Long id) {
        CustomerDTO customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }
	
 // Update customer profile
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomerProfile(@PathVariable Long id, @RequestBody CustomerDTO updatedCustomer) {
        CustomerDTO updated = customerService.updateCustomerProfile(id, updatedCustomer);
        return ResponseEntity.ok(new ApiResponse<CustomerDTO>("Customer profile updated successfully", updated));
    }



}
