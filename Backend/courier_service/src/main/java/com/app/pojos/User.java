package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long userId;
	@Column(name = "first_name")
	private String firstName;
	@Column(name = "last_name")
	private String lastName;
	@Column(unique = true)
	private String phone;
	@Column(unique = true)
	private String email;
	private String password;
	@Enumerated(EnumType.STRING)
	private UserRole role;
	@OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
	private List<Address> addresses = new ArrayList<Address>();
	@OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
	private List<Order> orders = new ArrayList<Order>();

//	public void addAddress(Address address) {
//		this.addresses.add(address);
//		address.setUserId(this);
//	}
//
//	public void removeAddress(Address address) {
//		this.addresses.remove(address);
//		address.setUserId(null);
//	}
//
//	public void addOrder(Order order) {
//		this.orders.add(order);
//		order.setUserId(this);
//	}
//
//	public void removeOrder(Order order) {
//		this.orders.remove(order);
//		order.setUserId(null);
//	}
}
