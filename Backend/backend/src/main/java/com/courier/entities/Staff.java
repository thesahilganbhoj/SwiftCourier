package com.courier.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "staff")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Staff {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="staff_id")
	private Long staffId;
	
	@Column(name="name", nullable=false)
	private String name;
	
	@Column(name="email", nullable=false)
	private String email;
	
	@Column(name = "password", nullable = false)
    private String password;
	
	@Column(name="contact_number", nullable=false)
	private String contactNumber;
	
	@ManyToOne
	@JoinColumn(name = "current_warehouse_id")
	private Warehouse currentWarehouse;
	
	@OneToOne(mappedBy="staff", cascade=CascadeType.ALL, orphanRemoval=true)
	private StaffAvailability staffAvailability;
	
	@OneToMany(mappedBy = "assignedStaff")
	private List<Order> assignedOrders;

	
}
