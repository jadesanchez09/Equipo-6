package com.jaime.feed_microservicio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class FeedPublico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFeed;

    private String texto;

    private String imagenUrl;

    private Boolean visible;

    private LocalDateTime fechaPublicacion;

    public Integer getIdFeed() {
        return idFeed;
    }

    public void setIdFeed(Integer idFeed) {
        this.idFeed = idFeed;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public LocalDateTime getFechaPublicacion() {
        return fechaPublicacion;
    }

    public void setFechaPublicacion(LocalDateTime fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }
}