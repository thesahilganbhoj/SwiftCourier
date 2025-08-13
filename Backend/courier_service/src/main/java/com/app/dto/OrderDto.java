package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.OrderStatus;
import com.app.pojos.ServiceType;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderDto {
	private Long orderId;
	private String trackingNumber;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate orderDate;
	private LocalDate deliveryDate;
	private ServiceType serviceType;
	private double declaredValue;
	private OrderStatus status;
	private CustomerDto senderId;
	private CustomerDto receiverId;
	private Long userId;
	private ParcelDto parcelId;
	private PaymentDto paymentId;

//	public void addParcelDto(ParcelDto parcelDto) {
//        this.parcels.add(parcelDto);
//        parcelDto.setOrderId(this.orderId);
//    }
//	
//	public void removeParcelDto(ParcelDto parcelDto) {
//        this.parcels.remove(parcelDto);
//        parcelDto.setOrderId(null);
//    }
}
