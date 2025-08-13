package com.app.service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.OrderDao;
import com.app.dao.UserDao;
import com.app.dto.OrderDto;
import com.app.pojos.CustomerType;
import com.app.pojos.Order;
import com.app.pojos.OrderStatus;
import com.app.pojos.ServiceType;
import com.app.pojos.User;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderDao orderDao;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UserDao userDao;

	@Override
	public OrderDto addOrder(OrderDto orderDto) {
		if (orderDto.getUserId() != null) {
			System.out.println("order with userId");
			Optional<User> optionalUser = userDao.findById(orderDto.getUserId());
			User user = optionalUser.get();
			Order order = modelMapper.map(orderDto, Order.class);
			order.setUserId(user);
			order.getSenderId().setCustomerType(CustomerType.SENDER);
			order.getReceiverId().setCustomerType(CustomerType.RECEIVER);
			order.setStatus(OrderStatus.ORDER_CREATED);
			if (order.getServiceType() == ServiceType.EXPRESS) {
				order.setDeliveryDate(order.getOrderDate().plusDays(2));
			} else {
				order.setDeliveryDate(order.getOrderDate().plusDays(4));
			}
			order.setTrackingNumber(TrackingNumberGenerator.generate());
			Order addedOrder = orderDao.save(order);
			return modelMapper.map(addedOrder, OrderDto.class);
		} else {
			Order order = modelMapper.map(orderDto, Order.class);
			order.getSenderId().setCustomerType(CustomerType.SENDER);
			order.getReceiverId().setCustomerType(CustomerType.RECEIVER);
			order.setStatus(OrderStatus.ORDER_CREATED);
			if (order.getServiceType() == ServiceType.EXPRESS) {
				order.setDeliveryDate(order.getOrderDate().plusDays(2));
			} else {
				order.setDeliveryDate(order.getOrderDate().plusDays(4));
			}
			order.setTrackingNumber(TrackingNumberGenerator.generate());
			Order addedOrder = orderDao.save(order);
			return modelMapper.map(addedOrder, OrderDto.class);
		}
	}

	@Override
	public OrderDto getOrderById(Long id) {
		Order order = orderDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found"));
		return modelMapper.map(order, OrderDto.class);
	}

	@Override
	public OrderDto getOrderByTrackingNumber(String TrackingNumber) {
		Order order = orderDao.findByTrackingNumber(TrackingNumber);
		return modelMapper.map(order, OrderDto.class);
	}

	@Override
	public List<OrderDto> getAllOrders() {
		List<Order> orders = orderDao.findAll();
		return orders.stream().map(order -> modelMapper.map(order, OrderDto.class)).collect(Collectors.toList());
	}

	@Override
	public OrderDto updateOrder(Long id, OrderDto orderDto) {
		Order order = orderDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found"));
//		order = modelMapper.map(orderDto, Order.class);
		order.setStatus(orderDto.getStatus());
		Order addedOrder = orderDao.save(order);
		return modelMapper.map(addedOrder, OrderDto.class);
	}

	@Override
	public void deleteOrder(Long id) {
		Order order = orderDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found"));
		orderDao.delete(order);
	}

	@Override
	public double calculateamount(int weight, int length, int width, int height) {
		int volumetricWeight = (length * width * height) / 5000;
		if (weight > volumetricWeight)
			return weight * 2;
		else
			return volumetricWeight * 2;
	}

	@Override
	public List<OrderDto> getAllOrders(OrderStatus status) {
		List<Order> orders = orderDao.findByStatus(status);
		return orders.stream().map(order -> modelMapper.map(order, OrderDto.class)).collect(Collectors.toList());
	}

	@Override
	public List<OrderDto> getAllActiveOrders(Long id) {
		User user = userDao.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
		List<Order> orders=orderDao.findByUserId(user);
		List<OrderDto> activeOrders = orders.stream()
										.map(order->
											{if(!order.getStatus().equals(OrderStatus.DELIVERED))
												return modelMapper.map(order, OrderDto.class);
											return null;
											}).collect(Collectors.toList());
											
		return activeOrders;
	}

	@Override
	public List<OrderDto> getAllDeliveredOrders(Long id) {
		User user = userDao.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
		List<Order> orders=orderDao.findByUserId(user);
		List<OrderDto> activeOrders = orders.stream()
										.map(order->
											{if(order.getStatus().equals(OrderStatus.DELIVERED))
												return modelMapper.map(order, OrderDto.class);
											return null;
											}).collect(Collectors.toList());
											
		return activeOrders;
	}
}

class TrackingNumberGenerator {
	private static final String ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private static final int LENGTH = 10;
	private static final SecureRandom RANDOM = new SecureRandom();

	public static String generate() {
		StringBuilder sb = new StringBuilder(LENGTH);
		for (int i = 0; i < LENGTH; i++) {
			sb.append(ALPHANUMERIC.charAt(RANDOM.nextInt(ALPHANUMERIC.length())));
		}
		return sb.toString();
	}
}
