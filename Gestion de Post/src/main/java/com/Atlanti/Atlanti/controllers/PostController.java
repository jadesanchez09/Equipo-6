package com.Atlanti.Atlanti.controllers;

import com.Atlanti.Atlanti.models.PostModel;
import com.Atlanti.Atlanti.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping()
    public ArrayList<PostModel> obtenerPost(){
        return postService.obtenerPost();

    }

    @PostMapping()
    public PostModel guardarPost(@RequestBody PostModel post){
        return this.postService.guardarPost(post);
    }

    @PutMapping("/{id}/revisar")
    public PostModel revisar(
            @PathVariable Long id,
            @RequestParam Long adminId,
            @RequestParam String observacion,
            @RequestParam boolean aprobado
    ){
        return postService.revisarPost(id, adminId, observacion, aprobado);
    }
    @GetMapping("/pendientes")
    public List<PostModel> getPendientes(){
        return postService.obtenerPendientes();
    }
    @GetMapping("/aprobados")
    public List<PostModel> getAprobados(){
        return postService.obtenerAprobados();
    }
    @GetMapping("/rechazados")
    public List<PostModel> getRechazados(){
        return postService.obtenerRechazados();
    }
    @GetMapping("/usuario/{id}")
    public List<PostModel> getPorUsuario(@PathVariable Long id){
        return postService.obtenerPorUsuario(id);
    }
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id){
        boolean ok = this.postService.eliminarPost(id);
        if (ok){
            return "SE ELIMINO EL POST" + id;
        }else{
            return "NO SE ELIMINO EL POST" + id;
        }
    }
}
