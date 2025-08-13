package com.app.dto;

import lombok.Setter;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class passwordDto {
	private String oldPassword;
	private String newPassword;
 }
