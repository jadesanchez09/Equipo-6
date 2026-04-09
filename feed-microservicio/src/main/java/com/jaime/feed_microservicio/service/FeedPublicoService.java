package com.jaime.feed_microservicio.service;

import com.jaime.feed_microservicio.dto.FeedPublicoDTO;
import com.jaime.feed_microservicio.entity.FeedPublico;
import com.jaime.feed_microservicio.repository.FeedPublicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class FeedPublicoService {

    @Autowired
    private FeedPublicoRepository repository;

    public FeedPublicoDTO publicarImagen(String texto, MultipartFile imagen) throws Exception {

        String rutaProyecto = System.getProperty("user.dir");

        File carpeta = new File(rutaProyecto + "/src/main/resources/static/uploads/");

        if (!carpeta.exists()) {
            carpeta.mkdirs();
        }

        String nombreArchivo = null;

        if (imagen != null && !imagen.isEmpty()) {

            nombreArchivo = UUID.randomUUID() + "_" + imagen.getOriginalFilename();

            File destino = new File(carpeta, nombreArchivo);

            imagen.transferTo(destino);
        }

        String urlImagen = null;

        if (nombreArchivo != null) {
            urlImagen = "/uploads/" + nombreArchivo;
        }

        FeedPublico post = new FeedPublico();

        post.setTexto(texto);
        post.setImagenUrl(urlImagen);
        post.setVisible(true);
        post.setFechaPublicacion(LocalDateTime.now());

        FeedPublico guardado = repository.save(post);

        return new FeedPublicoDTO(
                guardado.getIdFeed(),
                guardado.getTexto(),
                guardado.getImagenUrl(),
                guardado.getFechaPublicacion()
        );
    }

    public List<FeedPublicoDTO> obtenerFeed() {

        return repository.findByVisibleTrueOrderByFechaPublicacionDesc()
                .stream()
                .map(post -> new FeedPublicoDTO(
                        post.getIdFeed(),
                        post.getTexto(),
                        post.getImagenUrl(),
                        post.getFechaPublicacion()
                ))
                .toList();
    }
}