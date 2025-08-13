package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ParcelDto {
	private Long parcelId;
	private float weight;
	private int length;
	private int width;
	private int height;
}
