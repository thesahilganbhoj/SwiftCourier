package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.BranchDao;
import com.app.dao.EmployeeDao;
import com.app.dto.EmployeeDto;
import com.app.pojos.Branch;
import com.app.pojos.Employee;
import com.app.pojos.UserRole;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
	@Autowired
	private EmployeeDao employeeDao;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private BranchDao branchDao;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public EmployeeDto addEmployee(Long id,EmployeeDto employeeDto) {
		Employee employee = modelMapper.map(employeeDto, Employee.class);
		employee.setRole(UserRole.ROLE_EMPLOYEE);
		employee.setPassword(encoder.encode(employeeDto.getPassword()));
		Branch branch = branchDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Branch not found"));
		branch.getEmployees().add(employee);
		employee.setBranchId(branch);
		branchDao.save(branch);
		for (Employee e : branch.getEmployees()) {
			if(e.getEmail().equals(employee.getEmail())) {
				return modelMapper.map(e, EmployeeDto.class);
			}
		}
		return null;
	}

	@Override
	public EmployeeDto getEmployeeById(Long id) {
		Employee employee = employeeDao.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Employee not found"));
		return modelMapper.map(employee, EmployeeDto.class);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		List<Employee> employees = employeeDao.findAll();
		return employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {
		Employee employee = employeeDao.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Employee not found"));
		employee.setFirstName(employeeDto.getFirstName());
		employee.setLastName(employeeDto.getLastName());
		employee.setHireDate(employeeDto.getHireDate());
		employee.setSalary(employeeDto.getSalary());
		employee.setEmail(employeeDto.getEmail());
		employee.setPhone(employeeDto.getPhone());
		employee.setPassword(encoder.encode(employeeDto.getPassword()));
		Employee addedEmployee = employeeDao.save(employee);
		return modelMapper.map(addedEmployee, EmployeeDto.class);
	}

	@Override
	public void deleteEmployee(Long id) {
		Employee employee = employeeDao.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Employee not found"));
		employeeDao.delete(employee);
	}

	@Override
	public List<EmployeeDto> getBranchEmployees(Long id) {
		Branch branch = branchDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Branch not found"));
		List<Employee> employees = branch.getEmployees();
		return employees.stream().map(emp->modelMapper.map(emp, EmployeeDto.class)).collect(Collectors.toList());
	}

}
