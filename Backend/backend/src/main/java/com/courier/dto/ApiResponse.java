package com.courier.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse<T> {
    private LocalDateTime timeStamp;
    private String message;
    private T data;

    public ApiResponse(String message, T data) {
        this.timeStamp = LocalDateTime.now();
        this.message = message;
        this.data = data;
    }

    public ApiResponse(String message) {
        this.timeStamp = LocalDateTime.now();
        this.message = message;
    }
}
