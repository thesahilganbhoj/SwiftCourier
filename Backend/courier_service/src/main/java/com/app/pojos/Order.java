package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private Long orderId;
	@Column(name = "tracking_number")
	private String trackingNumber;
	@Column(name = "order_date")
	private LocalDate orderDate;
	@Column(name = "delivery_date")
	private LocalDate deliveryDate;
	@Enumerated(EnumType.STRING)
	@Column(name = "service_type")
	private ServiceType serviceType;
	@Column(name = "declared_value")
	private double declaredValue;
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "sender_id")
	private Customer senderId;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "receiver_id")
	private Customer receiverId;
	@OneToOne(cascade = CascadeType.ALL)
	private Parcel parcelId;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "payment_id")
	private Payment paymentId;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User userId;

//	public void addComplaint(Complaint complaint) {
//        this.complaints.add(complaint);
//        complaint.setOrderId(this);
//    }
//	
//	public void removeComplaint(Complaint complaint) {
//        this.complaints.remove(complaint);
//        complaint.setOrderId(null);
//    }
}
