package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BranchDto;
import com.app.dto.ComplaintDto;
import com.app.dto.EmployeeDto;
import com.app.dto.OrderDto;
import com.app.dto.UserDto;
import com.app.dto.UserDtoForProfileUpdate;
import com.app.dto.passwordDto;
import com.app.pojos.OrderStatus;
import com.app.service.BranchService;
import com.app.service.ComplaintService;
import com.app.service.EmployeeService;
import com.app.service.OrderService;
import com.app.service.UserService;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private BranchService branchService;
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private ComplaintService complaintService;
	@Autowired
	private UserService userService;
	@PostMapping("/signup")
	public UserDto createUser(@RequestBody UserDto userDTO) {
		return userService.addAdmin(userDTO);
	}
	@GetMapping("/orders")
	public List<OrderDto> getAllOrders() {
		return orderService.getAllOrders();
	}

	@GetMapping("/orders/{status}")
	public List<OrderDto> getAllOrders(@PathVariable OrderStatus status) {
		return orderService.getAllOrders(status);
	}
	@GetMapping("/branch/{id}")
	public BranchDto getBranchById(@PathVariable Long id) {
		return branchService.getBranchById(id);
	}

	@GetMapping("/branch")
	public List<BranchDto> getAllBranches() {
		return branchService.getAllBranches();
	}

	@PostMapping("/branch")
	public ResponseEntity<?> addBranch(@RequestBody BranchDto branchDTO) {
		BranchDto addedBranch =  branchService.addBranch(branchDTO);
		if(addedBranch!=null) {
			return ResponseEntity.ok("Branch Added Successfully");
		}else {
			return ResponseEntity.ok("Branch Addition Failed");
		}
	}
	
	@PutMapping("/branch/{id}")
	public BranchDto updateBranch(@PathVariable Long id, @RequestBody BranchDto branchDTO) {
		
		return branchService.updateBranch(id, branchDTO);
	}
	
	@DeleteMapping("/branch/{id}")
	public void deleteBranch(@PathVariable Long id) {
		branchService.deleteBranch(id);
	}
	
	@GetMapping("/employees")
	public List<EmployeeDto> getAllEmployees() {
		return employeeService.getAllEmployees();
	}
	
	@GetMapping("/employees/{id}")
	public List<EmployeeDto> getBranchEmployees(@PathVariable Long id) {
		return employeeService.getBranchEmployees(id);
	}
	
	@GetMapping("/employee/{id}")
	public EmployeeDto getEmployee(@PathVariable Long id) {
		return employeeService.getEmployeeById(id);
	}
	
	@PostMapping("/employee/{id}")
	public EmployeeDto addEmployee(@PathVariable Long id,@RequestBody EmployeeDto employeeDTO) {
		return employeeService.addEmployee(id,employeeDTO);
	}
	

	@PutMapping("/employee/{id}")
	public EmployeeDto updateEmployee(@PathVariable Long id, @RequestBody EmployeeDto employeeDTO) {
		return employeeService.updateEmployee(id, employeeDTO);
	}
	
	
	@DeleteMapping("/employee/{id}")
	public void deleteEmployee(@PathVariable Long id) {
		employeeService.deleteEmployee(id);
	}
	
	
	@GetMapping("/complaints")
	public List<ComplaintDto> getAllComplaints() {
		return complaintService.getAllComplaints();
	}

	@GetMapping("/profile/{id}")
	public UserDto getProfile(@PathVariable Long id) {
		return userService.getUserById(id);
	}
	
	@PutMapping("/profile/{id}")
	public ResponseEntity<?> updateSelf(@PathVariable Long id, @RequestBody UserDtoForProfileUpdate userDto) {
		UserDtoForProfileUpdate updatedProfile = userService.updateUser(id, userDto);
		if (updatedProfile != null) {
			return ResponseEntity.status(HttpStatus.OK).body("Successful");
		} else {
			return ResponseEntity.status(HttpStatus.OK).body("Unsuccessful");
		}
	}
	
	@PatchMapping("/profile/{id}")//.....................................................................................
	public ResponseEntity<?> updatePass(@PathVariable Long id, @RequestBody passwordDto passDto) {
		String message = userService.updatePassword(id, passDto);
		return ResponseEntity.status(HttpStatus.OK).body(message);

	}
	}
