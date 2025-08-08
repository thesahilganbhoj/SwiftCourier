package com.courier.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.custom_exceptions.ResourceNotFoundException;
import com.courier.dto.CustomerDTO;
import com.courier.dto.CustomerOrderListDTO;
import com.courier.dto.CustomerOrderRespDTO;
import com.courier.dto.PendingOrderDTO;
import com.courier.entities.Customer;
import com.courier.entities.Feedback;
import com.courier.entities.Order;
import com.courier.repository.CustomerRepository;
import com.courier.repository.FeedbackRepository;
import com.courier.repository.OrderRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private FeedbackRepository feedbackRepo;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    
    @Override
    public CustomerDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));

        return new CustomerDTO(
            customer.getCustomerId(),
            customer.getName(),
            customer.getEmail(),
            customer.getContactNumber(),
            customer.getAddress()
        );
    }
    
    @Override
    public CustomerDTO updateCustomerProfile(Long customerId, CustomerDTO updatedCustomer) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with ID: " + customerId));

        customer.setName(updatedCustomer.getName());
        customer.setEmail(updatedCustomer.getEmail());
        customer.setAddress(updatedCustomer.getAddress());

        Customer saved = customerRepository.save(customer);
        return mapToDTO(saved);
    }

    private CustomerDTO mapToDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setCustomerId(customer.getCustomerId());
        dto.setName(customer.getName());
        dto.setEmail(customer.getEmail());
        dto.setAddress(customer.getAddress());
        return dto;
    }
    
    @Override
    public CustomerOrderRespDTO getOrderDetailsById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return new CustomerOrderRespDTO(
            order.getOrderId(),
            order.getTrackingId(),
            order.getCreatedAt() != null ? order.getCreatedAt().toLocalDate().toString() : "",
            order.getDescription(),
            order.getSenderName(),
            order.getSenderAddress(),
            order.getReceiverName(),
            order.getReceiverContact(),
            order.getReceiverAddress(),
            order.getWeight()
        );
    }
    
    @Override
    public List<CustomerOrderListDTO> getOrdersByCustomerId(Long customerId) {
        List<Order> orders = orderRepository.findByCustomerCustomerId(customerId);
        return orders.stream()
                     .map(order -> new CustomerOrderListDTO(
                    		 String.valueOf(order.getOrderId()),
                             order.getReceiverName(),
                             order.getStatus()))
                     .toList();
    }
    
    @Override
    public List<PendingOrderDTO> getAllPendingOrders() {
        List<Order> pendingOrders = orderRepository.findByStatus("Pending");
        return pendingOrders.stream()
                .map(order -> new PendingOrderDTO(
                		String.valueOf(order.getOrderId()),
                        order.getReceiverName(),
                        order.getStatus(),
                        order.getTrackingId()))
                .toList();
    }

    @Override
    public PendingOrderDTO trackOrderByTrackingId(String trackingId) {
        Order order = orderRepository.findByTrackingId(trackingId);
        if (order == null || !"Pending".equals(order.getStatus())) {
            throw new RuntimeException("Pending order not found for tracking ID: " + trackingId);
        }
        return new PendingOrderDTO(
                "ORD" + String.format("%03d", order.getOrderId()),
                order.getReceiverName(),
                order.getStatus(),
                order.getTrackingId()
        );
    }

    @Override
    public Order addOrder(Order order) {
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setTrackingId(UUID.randomUUID().toString().substring(0, 10).toUpperCase());
        order.setStatus("Placed");
        return orderRepository.save(order);
    }

}
