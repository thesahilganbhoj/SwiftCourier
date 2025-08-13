package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "branches")
@Getter
@Setter
@NoArgsConstructor
public class Branch {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "branch_id")
	private Long branchId;
	@Column(name = "branch_name")
	private String branchName;
	private String phone;
	private String email;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address addressId;
	@OneToMany(mappedBy = "branchId", cascade = CascadeType.ALL)
	private List<Employee> employees = new ArrayList<Employee>();

//	public void addEmployee(Employee employee) {
//        this.employees.add(employee);
//        employee.setBranchId(this);
//    }
//	
//	public void removeEmployee(Employee employee) {
//        this.employees.remove(employee);
//        employee.setBranchId(null);
//    }
}
