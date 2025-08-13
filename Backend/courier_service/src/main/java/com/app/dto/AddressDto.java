package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddressDto {
	private Long addressId;
	private String address;
	private String address2;
	private int postalCode;
	private String city;
	private String state;
	private String country;
	private Long userId;
}
