package com.courier.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WarehouseDTO {
	@NotBlank(message = "Warehouse name is required")
	private Long warehouseId;

    @NotBlank(message = "Warehouse name is required")
    private String name;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Contact number is required")
    @Size(min = 10, max = 10, message = "Contact number must be 10 digits")
    private String contactNumber;
}
