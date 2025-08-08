package com.courier.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.dto.ApiResponse;
import com.courier.dto.CustomerDTO;
import com.courier.dto.CustomerOrderListDTO;
import com.courier.dto.CustomerOrderRespDTO;
import com.courier.dto.PendingOrderDTO;
import com.courier.entities.Feedback;
import com.courier.entities.Order;
import com.courier.service.CustomerService;

import lombok.AllArgsConstructor;

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


    @GetMapping("/orders/{id}") // "id" is order id
    public ResponseEntity<CustomerOrderRespDTO> getOrderDetails(@PathVariable Long id) {
    	CustomerOrderRespDTO order = customerService.getOrderDetailsById(id);
        return ResponseEntity.ok(order);
    }
    
    @GetMapping("/{id}/orders") // "id" is customer id
    public ResponseEntity<List<CustomerOrderListDTO>> getAllOrdersForCustomer(@PathVariable Long id) {
        List<CustomerOrderListDTO> orders = customerService.getOrdersByCustomerId(id);
        return ResponseEntity.ok(orders);
    }
    
 // Get all pending orders
    @GetMapping("/orders/pending")
    public ResponseEntity<List<PendingOrderDTO>> getPendingOrders() {
        return ResponseEntity.ok(customerService.getAllPendingOrders());
    }

    // Track order by tracking ID
    @GetMapping("/orders/track/{trackingId}")
    public ResponseEntity<PendingOrderDTO> trackOrder(@PathVariable String trackingId) {
        return ResponseEntity.ok(customerService.trackOrderByTrackingId(trackingId));
    }

    
    @PostMapping("/orders/add")
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        Order savedOrder = customerService.addOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Order placed successfully", savedOrder));
    }


}
