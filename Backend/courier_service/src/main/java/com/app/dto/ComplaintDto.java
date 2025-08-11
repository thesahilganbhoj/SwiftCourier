package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.ComplaintStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ComplaintDto {
	private Long complaintId;
	private LocalDate complaintDate;
	private String description;
	private ComplaintStatus complaintStatus;
	private String remark;
	private Long orderId;
}
