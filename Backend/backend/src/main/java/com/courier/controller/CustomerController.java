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
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class CustomerController {

	private final CustomerService customerService;

	@PostMapping("/feedback")
	public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
	    feedback.setCreatedAt(LocalDateTime.now());
	    customerService.saveFeedback(feedback);
	    return ResponseEntity.status(HttpStatus.CREATED)
	                         .body(new ApiResponse("Feedback submitted successfully"));
	}
	
	@GetMapping("/{id}")
    public CustomerDTO getCustomerProfile(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

}
