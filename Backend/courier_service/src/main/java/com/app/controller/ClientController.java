package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderDto;
import com.app.dto.UserDto;
import com.app.dto.UserDtoForProfileUpdate;
import com.app.dto.passwordDto;
import com.app.service.OrderService;
import com.app.service.UserService;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/client")
public class ClientController {

	@Autowired
	private UserService userService;
	@Autowired
	private OrderService orderService;

	@PostMapping("/signup")
	public UserDto createUser(@RequestBody UserDto userDTO) {
		System.out.println("Inside the signup method");
		return userService.addClient(userDTO);

	}
	// add an order
	@PostMapping("/order")
	public OrderDto addOrder(@RequestBody OrderDto orderDTO) {
		return orderService.addOrder(orderDTO);
	}
	// View all his orders except delivered
	@GetMapping("/active_orders/{id}")
	public List<OrderDto> getActiveOrders(@PathVariable Long id){
		return orderService.getAllActiveOrders(id);
	}
	// View only delivered orders
	@GetMapping("/delivered_orders/{id}")
	public List<OrderDto> getDeliveredOrders(@PathVariable Long id){
		return orderService.getAllDeliveredOrders(id);
	}
	// view all addresses
	// Get Profile
	@GetMapping("/profile/{id}")
	public UserDto getProfile(@PathVariable Long id) {
		return userService.getUserById(id);
	}

	// update profile
	@PutMapping("/profile/{id}")
	public ResponseEntity<?> updateSelf(@PathVariable Long id, @RequestBody UserDtoForProfileUpdate userDto) {
		UserDtoForProfileUpdate updatedProfile = userService.updateUser(id, userDto);
		if (updatedProfile != null) {
			return ResponseEntity.status(HttpStatus.OK).body("Successful");
		} else {
			return ResponseEntity.status(HttpStatus.OK).body("Unsuccessful");
		}
	}

	// update password
	@PatchMapping("/profile/{id}")
	public ResponseEntity<?> updateSelf(@PathVariable Long id, @RequestBody passwordDto passDto) {
		String message = userService.updatePassword(id, passDto);
		return ResponseEntity.status(HttpStatus.OK).body(message);

	}
}
