package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Parcel;

public interface ParcelDao extends JpaRepository<Parcel, Long> {

}
