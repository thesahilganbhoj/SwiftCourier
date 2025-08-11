package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ComplaintDto;
import com.app.dto.OrderDto;
import com.app.service.ComplaintService;
import com.app.service.OrderService;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private ComplaintService complaintService;

	@PostMapping("/complaint")
	public ComplaintDto addComplaint(@RequestBody ComplaintDto complaintDTO) {
		return complaintService.addComplaint(complaintDTO);
	}

	// get order by trackingNumber......................................................
	@GetMapping("/order/{trackingNumber}")
	public OrderDto getOrderById(@PathVariable String trackingNumber) {
		return orderService.getOrderByTrackingNumber(trackingNumber);
	}

	// add an order...........................................................
	@PostMapping("/order")
	public OrderDto addOrder(@RequestBody OrderDto orderDTO) {
		return orderService.addOrder(orderDTO);
	}
	@GetMapping("/calculateamount/{weight}/{length}/{width}/{height}")
	public double calculateamount(@PathVariable int weight, @PathVariable int length, @PathVariable int width,
			@PathVariable int height) {
		return orderService.calculateamount(weight, length, width, height);
	}
}
