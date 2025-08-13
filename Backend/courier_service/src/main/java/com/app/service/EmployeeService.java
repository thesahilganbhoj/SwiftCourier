package com.app.service;

import java.util.List;

import com.app.dto.EmployeeDto;

public interface EmployeeService {

	EmployeeDto addEmployee(Long id, EmployeeDto employeeDto);

	EmployeeDto getEmployeeById(Long id);

	List<EmployeeDto> getAllEmployees();

	EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto);

	void deleteEmployee(Long id);

	List<EmployeeDto> getBranchEmployees(Long id);

}
