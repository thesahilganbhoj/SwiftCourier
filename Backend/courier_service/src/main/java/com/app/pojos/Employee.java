package com.app.pojos;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
public class Employee extends User {
	@Column(name = "hire_date")
	private LocalDate hireDate;
	private double salary;
	@ManyToOne
	@JoinColumn(name = "branch_id")
	private Branch branchId;
}
