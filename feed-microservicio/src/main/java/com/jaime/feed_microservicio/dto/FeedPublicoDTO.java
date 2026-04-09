package com.jaime.feed_microservicio.dto;

import java.time.LocalDateTime;

public class FeedPublicoDTO {

    private Integer idFeed;
    private String texto;
    private String imagenUrl;
    private LocalDateTime fechaPublicacion;

    public FeedPublicoDTO(Integer idFeed, String texto, String imagenUrl, LocalDateTime fechaPublicacion) {
        this.idFeed = idFeed;
        this.texto = texto;
        this.imagenUrl = imagenUrl;
        this.fechaPublicacion = fechaPublicacion;
    }

    public Integer getIdFeed() {
        return idFeed;
    }

    public String getTexto() {
        return texto;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public LocalDateTime getFechaPublicacion() {
        return fechaPublicacion;
    }
}