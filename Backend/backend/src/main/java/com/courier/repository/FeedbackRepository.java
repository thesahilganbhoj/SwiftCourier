package com.courier.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.entities.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    // You can add custom queries here if needed
    // Example:
    // List<Feedback> findByCustomerId(Long customerId);
    // List<Feedback> findByOrderOrderId(Long orderId);
}
