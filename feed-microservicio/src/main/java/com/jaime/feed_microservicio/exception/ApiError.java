package com.jaime.feed_microservicio.exception;

import java.time.LocalDateTime;

public class ApiError {

    private String mensaje;
    private int status;
    private LocalDateTime fecha;

    public ApiError(String mensaje, int status) {
        this.mensaje = mensaje;
        this.status = status;
        this.fecha = LocalDateTime.now();
    }

    public String getMensaje() {
        return mensaje;
    }

    public int getStatus() {
        return status;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }
}