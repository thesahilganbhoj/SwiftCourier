package com.courier.repository;

import com.courier.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Find orders by assigned staff ID and status - Fixed query
    @Query("SELECT o FROM Order o WHERE o.assignedStaff.staffId = :staffId AND o.status = :status")
    List<Order> findByAssignedStaff_StaffIdAndStatus(@Param("staffId") Long staffId, @Param("status") String status);
    
    // Find all orders by assigned staff ID (regardless of status) - Fixed query
    @Query("SELECT o FROM Order o WHERE o.assignedStaff.staffId = :staffId")
    List<Order> findByAssignedStaff_StaffId(@Param("staffId") Long staffId);
    
    Optional<Order> findByOrderId(Long id);
    
    List<Order> findByCustomerCustomerId(Long customerId);
    
    List<Order> findByStatus(String status);
    
    Order findByTrackingId(String trackingId);
}
