package com.app.service;

import java.util.List;

import com.app.dto.UserDto;
import com.app.dto.UserDtoForProfileUpdate;
import com.app.dto.passwordDto;

public interface UserService {
	
	UserDto addClient(UserDto userDto);
	UserDto getUserByEmail(String email);
	
	UserDto getUserById(Long id);

	List<UserDto> getAllUsers();

	void deleteUser(Long id);

	UserDtoForProfileUpdate updateUser(Long id, UserDtoForProfileUpdate userDto);

	String updatePassword(Long id, passwordDto passDto);

	UserDto addAdmin(UserDto userDTO);

}
