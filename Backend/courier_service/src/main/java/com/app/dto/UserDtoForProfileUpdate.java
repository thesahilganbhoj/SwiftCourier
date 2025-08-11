package com.app.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDtoForProfileUpdate {
	private String firstName;
	private String lastName;
	private String phone;
	private String email;
}
