package com.courier.repository;

import com.courier.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
//    List<Order> findByStaffIdAndStatus(Long staffId, String status);
    List<Order> findByAssignedStaff_StaffIdAndStatus(Long staffId, String status);
    
    List<Order> findByStatus(String status);
    Optional<Order> findByOrderId(Long id);
    
    List<Order> findByCustomerCustomerId(Long customerId);
    
    List<Order> findByStatus(String status);
    Order findByTrackingId(String trackingId);


}
