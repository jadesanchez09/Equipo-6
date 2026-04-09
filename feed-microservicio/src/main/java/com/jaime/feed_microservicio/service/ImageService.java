package com.jaime.feed_microservicio.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class ImageService {

    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";

    public String guardarImagen(MultipartFile file) throws Exception {

        if(file.isEmpty()){
            throw new RuntimeException("Archivo vacío");
        }

        File carpeta = new File(UPLOAD_DIR);

        if(!carpeta.exists()){
            carpeta.mkdirs();
        }

        String nombreArchivo = UUID.randomUUID() + "_" + file.getOriginalFilename();

        File destino = new File(UPLOAD_DIR + nombreArchivo);

        file.transferTo(destino);

        return "/uploads/" + nombreArchivo;
    }
}