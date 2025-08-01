package com.courier.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "customer_id")
	private Long customerId;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "contact_number", nullable = false)
	private String contactNumber;

	@Column(name = "address", nullable = false)
	private String address;

	
	public Customer(String name, String email, String password, String contactNumber, String address) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.contactNumber = contactNumber;
		this.address = address;
	}

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orders;

	public void addOrder(Order o) {

		this.orders.add(o);
		o.setCustomer(this);
	}

	public void removeOrder(Order o) {
		this.orders.remove(o);
		o.setCustomer(null);
	}
}
