package com.app.dto;

import com.app.pojos.CustomerType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomerDto {
	private Long customerId;
	private String firstName;
	private String lastName;
	private String phone;
	private String email;
	private CustomerType customerType;
	private AddressDto addressId;
}
