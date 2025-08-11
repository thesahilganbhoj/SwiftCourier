package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
public class Complaint {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "complaint_id")
	private Long complaintId;
	@Column(name = "complaint_date")
	private LocalDate complaintDate;
	private String description;
	@Enumerated(EnumType.STRING)
	@Column(name = "complaint_status")
	private ComplaintStatus complaintStatus;
	private String remark;
	@OneToOne
	@JoinColumn(name = "order_id")
	private Order orderId;
}
