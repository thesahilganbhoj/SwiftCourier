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
@Table(name = "feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long feedbackId;
	@ManyToOne
	@JoinColumn(name="order_id", nullable=false)
	public Order order;
	@Column(name = "customer_id")
	private Long customerId;
	@Column
	private Integer rating;
	@Column
	private String comment;
	
	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

}
