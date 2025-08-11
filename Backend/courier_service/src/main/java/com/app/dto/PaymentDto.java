package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.PaymentMethod;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PaymentDto {
	private Long paymentId;
	private Float amount;
	private PaymentMethod paymentMethod;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate paymentDate;
}
