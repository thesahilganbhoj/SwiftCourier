package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "parcels")
@Getter
@Setter
@NoArgsConstructor
public class Parcel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "parcel_id")
	private Long parcelId;
	private float weight;
	private int length;
	private int width;
	private int height;
}
