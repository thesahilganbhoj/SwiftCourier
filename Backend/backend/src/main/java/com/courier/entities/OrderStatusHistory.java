package com.courier.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="order_status_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusHistory {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="status_id")
	private Integer statusId;
	
	@ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "updated_by_user_id", nullable = false)
    private Long updatedByUserId;

    @Column(name = "updated_by_role", nullable = false)
    private String updatedByRole; // values: "ADMIN", "STAFF"

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "location")
    private String location;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "notes")
    private String notes;
    
    
    
}
