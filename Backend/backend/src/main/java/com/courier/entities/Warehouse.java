package com.courier.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "warehouses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private Long warehouseId;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;
    
    @OneToMany(mappedBy = "currentWarehouse")  // Back-reference
    private List<Staff> staffList;

    // Custom constructor (without ID)
    public Warehouse(String city, String address, String contactNumber) {
        this.city = city;
        this.address = address;
        this.contactNumber = contactNumber;
    }
}
