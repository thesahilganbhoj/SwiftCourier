package com.courier.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;
    
    @OneToMany(mappedBy = "currentWarehouse")  // Back-reference
    private List<Staff> staffList;
    
    @OneToOne(mappedBy = "warehouse", cascade = CascadeType.ALL, orphanRemoval = true)
    private Admin admin;

    // Custom constructor (without ID)
    public Warehouse(String city, String address, String contactNumber) {
        this.city = city;
        this.address = address;
        this.contactNumber = contactNumber;
    }
}
