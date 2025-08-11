package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.UserDao;
import com.app.dto.UserDto;
import com.app.dto.UserDtoForProfileUpdate;
import com.app.dto.passwordDto;
import com.app.pojos.User;
import com.app.pojos.UserRole;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public UserDto addClient(UserDto userDto) {
		User user = modelMapper.map(userDto, User.class);
		user.setRole(UserRole.ROLE_CLIENT);
		user.setPassword(encoder.encode(userDto.getPassword()));
		User addedUser = userDao.save(user);
		return modelMapper.map(addedUser, UserDto.class);
	}

	
	@Override
	public UserDto addAdmin(UserDto userDTO) {
		User user = modelMapper.map(userDTO, User.class);
		user.setRole(UserRole.ROLE_ADMIN);
		user.setPassword(encoder.encode(userDTO.getPassword()));
		User addedUser = userDao.save(user);
		return modelMapper.map(addedUser, UserDto.class);
	}

	@Override
	public UserDto getUserById(Long id) {
		User user = userDao.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
		return modelMapper.map(user, UserDto.class);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = userDao.findAll();
		return users.stream().map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
	}

	@Override
	public UserDtoForProfileUpdate updateUser(Long id, UserDtoForProfileUpdate userDto) {
		User user = userDao.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
		user.setEmail(userDto.getEmail());
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setPhone(userDto.getPhone());
		User addedUser = userDao.save(user);
		return modelMapper.map(addedUser, UserDtoForProfileUpdate.class);
	}

	@Override
	public void deleteUser(Long id) {
		User user = userDao.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
		userDao.delete(user);
	}

	@Override
	public String updatePassword(Long id, passwordDto passDto) {
		User user = userDao.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
		if(encoder.matches(passDto.getOldPassword(), user.getPassword())) {
			user.setPassword(encoder.encode(passDto.getNewPassword()));
			System.out.println(user);
			userDao.save(user);
			return "Successful";
		}
		return "Unsuccessful";
	}


	@Override
	public UserDto getUserByEmail(String email) {
		User user = userDao.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User not found"));
		return modelMapper.map(user,UserDto.class);
	}

	

}
