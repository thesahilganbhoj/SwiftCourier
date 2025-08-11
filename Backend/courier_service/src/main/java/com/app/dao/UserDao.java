package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.User;

public interface UserDao extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	//User findByEmail(String email);
}
