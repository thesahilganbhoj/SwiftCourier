package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ComplaintDto;
import com.app.dto.OrderDto;
import com.app.dto.UserDto;
import com.app.dto.UserDtoForProfileUpdate;
import com.app.dto.passwordDto;
import com.app.pojos.OrderStatus;
import com.app.service.ComplaintService;
import com.app.service.OrderService;
import com.app.service.UserService;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private ComplaintService complaintService;
	@Autowired
	private UserService userService;

	// view all orders.....................................................................
	@GetMapping("/orders")
	public List<OrderDto> getAllOrders() {
		return orderService.getAllOrders();
	}

	// view orders according to status...............................................................
	@GetMapping("/orders/{status}")
	public List<OrderDto> getAllOrders(@PathVariable OrderStatus status) {
		return orderService.getAllOrders(status);
	}

	

	// get order by trackingNumber....................................................................
	@GetMapping("/order/{trackingNumber}")
	public OrderDto getOrderById(@PathVariable String trackingNumber) {
		return orderService.getOrderByTrackingNumber(trackingNumber);
	}

	// update and order..................................................................................
	@PutMapping("/order/{id}")
	public OrderDto updateOrder(@PathVariable Long id, @RequestBody OrderDto orderDTO) {
		return orderService.updateOrder(id, orderDTO);
	}

	// delete an order................................................................
	@DeleteMapping("/order/{id}")
	public void deleteOrder(@PathVariable Long id) {
		orderService.deleteOrder(id);
	}

	// Get Profile..................................................................
	@GetMapping("/profile/{id}")
	public UserDto getProfile(@PathVariable Long id) {
		return userService.getUserById(id);
	}

	// update profile..................................................................
	@PutMapping("/profile/{id}")
	public ResponseEntity<?> updateSelf(@PathVariable Long id, @RequestBody UserDtoForProfileUpdate userDto) {
		UserDtoForProfileUpdate updatedProfile = userService.updateUser(id, userDto);
		if (updatedProfile != null) {
			return ResponseEntity.status(HttpStatus.OK).body("Successful");
		} else {
			return ResponseEntity.status(HttpStatus.OK).body("Unsuccessful");
		}
	}

	// update password..............................................................
	@PatchMapping("/profile/{id}")
	public ResponseEntity<?> updateSelf(@PathVariable Long id, @RequestBody passwordDto passDto) {
		String message = userService.updatePassword(id, passDto);
		return ResponseEntity.status(HttpStatus.OK).body(message);

	}

	// view all complaints
	@GetMapping("/complaints")
	public List<ComplaintDto> getAllComplaints() {
		return complaintService.getAllComplaints();
	}

	// Update a complaint
	@PutMapping("/complaint/{id}")
	public ComplaintDto updateComplaint(@PathVariable Long id, @RequestBody ComplaintDto complaintDTO) {
		return complaintService.updateComplaint(id, complaintDTO);
	}
}
