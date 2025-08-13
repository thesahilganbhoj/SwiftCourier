package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderDto;
import com.app.service.OrderService;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/order")
public class OrderController {
	@Autowired
	private OrderService orderService;

	@GetMapping("")
	public List<OrderDto> getAllOrders() {
		return orderService.getAllOrders();
	}

//	// get order by id
//	@GetMapping("/{id}")
//	public OrderDto getOrderById(@PathVariable Long id) {
//		return orderService.getOrderById(id);
//	}

	// get order by trackingNumber
	@GetMapping("/{trackingNumber}")
	public OrderDto getOrderById(@PathVariable String trackingNumber) {
		return orderService.getOrderByTrackingNumber(trackingNumber);
	}

	// add an order
	@PostMapping("")
	public OrderDto addOrder(@RequestBody OrderDto orderDTO) {
		return orderService.addOrder(orderDTO);
	}

	// update and order
	@PutMapping("/{id}")
	public OrderDto updateOrder(@PathVariable Long id, @RequestBody OrderDto orderDTO) {
		return orderService.updateOrder(id, orderDTO);
	}

	// delete an order
	@DeleteMapping("/{id}")
	public void deleteOrder(@PathVariable Long id) {
		orderService.deleteOrder(id);
	}

	@GetMapping("/calculateamount/{weight}/{length}/{width}/{height}")
	public double calculateamount(@PathVariable int weight, @PathVariable int length, @PathVariable int width,
			@PathVariable int height) {
		return orderService.calculateamount(weight, length, width, height);
	}
}
