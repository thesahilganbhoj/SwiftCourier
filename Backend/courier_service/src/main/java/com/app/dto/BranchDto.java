package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BranchDto {
	private Long branchId;
	private String branchName;
	private String phone;
	private String email;
	private AddressDto addressId;
}

