package com.courier.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "route_tracking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RouteTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tracking_id")
    private Long trackingId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "from_warehouse_id", nullable = false)
    private Long fromWarehouseId;

    @Column(name = "to_warehouse_id", nullable = false)
    private Long toWarehouseId;

    @Column(name = "departure_time", nullable = false)
    private LocalDateTime departureTime;

    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime;

    @Column(name = "status", nullable = false)
    private String status;

    // Custom constructor (without ID)
    public RouteTracking(Order order, Long fromWarehouseId, Long toWarehouseId,
                         LocalDateTime departureTime, LocalDateTime arrivalTime, String status) {
        this.order = order;
        this.fromWarehouseId = fromWarehouseId;
        this.toWarehouseId = toWarehouseId;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.status = status;
    }
}
