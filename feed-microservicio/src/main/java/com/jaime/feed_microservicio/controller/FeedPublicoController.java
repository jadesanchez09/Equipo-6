package com.jaime.feed_microservicio.controller;

import com.jaime.feed_microservicio.dto.FeedPublicoDTO;
import com.jaime.feed_microservicio.service.FeedPublicoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
public class FeedPublicoController {

    @Autowired
    private FeedPublicoService service;

    @PostMapping(value="/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FeedPublicoDTO> publicarPost(

            @RequestParam(required=false) String texto,
            @RequestParam(required=false) MultipartFile imagen

    ) throws Exception {

        return ResponseEntity.ok(service.publicarImagen(texto, imagen));
    }

    @GetMapping("/posts")
    public ResponseEntity<List<FeedPublicoDTO>> obtenerFeed(){

        return ResponseEntity.ok(service.obtenerFeed());
    }
}