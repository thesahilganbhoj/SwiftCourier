package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Order;
import com.app.pojos.OrderStatus;
import com.app.pojos.User;

public interface OrderDao extends JpaRepository<Order, Long> {
	Order findByTrackingNumber(String trackingNumber);

	List<Order> findByStatus(OrderStatus status);

	List<Order> findByUserId(User user);
}
