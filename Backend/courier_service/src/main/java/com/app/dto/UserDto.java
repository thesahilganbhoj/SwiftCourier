package com.app.dto;

import com.app.pojos.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
	private Long userId;
	private String firstName;
	private String lastName;
	private String phone;
	private String email;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	private UserRole role;
}
