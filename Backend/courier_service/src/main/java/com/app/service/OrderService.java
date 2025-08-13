package com.app.service;

import java.util.List;

import com.app.dto.OrderDto;
import com.app.pojos.OrderStatus;

public interface OrderService {
	// add order
	OrderDto addOrder(OrderDto orderDto);

	// get order by id
	OrderDto getOrderById(Long id);
	
	OrderDto getOrderByTrackingNumber(String trackingNumber);

	List<OrderDto> getAllOrders();

	// update order
	OrderDto updateOrder(Long id, OrderDto orderDto);

	// delete order
	void deleteOrder(Long id);

	double calculateamount(int weight, int length, int width, int height);

	List<OrderDto> getAllOrders(OrderStatus status);

	List<OrderDto> getAllActiveOrders(Long id);

	List<OrderDto> getAllDeliveredOrders(Long id);

}
