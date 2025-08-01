
package com.courier.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "customer_id", nullable = false)
    private Integer customerId;

    @Column(name = "assigned_staff_id")
    private Integer assignedStaffId;

    @Column(name = "source_warehouse_id", nullable = false)
    private Integer sourceWarehouseId;

    @Column(name = "destination_warehouse_id", nullable = false)
    private Integer destinationWarehouseId;

    @Column(name = "sender_name", nullable = false)
    private String senderName;

    @Column(name = "receiver_name", nullable = false)
    private String receiverName;

    @Column(name = "receiver_address", nullable = false)
    private String receiverAddress;

    @Column(name = "receiver_contact", nullable = false)
    private String receiverContact;

    @Column(name = "weight", nullable = false)
    private Double weight;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "tracking_id", unique = true, nullable = false)
    private String trackingId;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "price")
    private double price;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> feedback;

  }
