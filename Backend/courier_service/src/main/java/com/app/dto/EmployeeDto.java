package com.app.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeDto extends UserDto {
	private LocalDate hireDate;
	private double salary;
	private BranchDto branchId;
}
