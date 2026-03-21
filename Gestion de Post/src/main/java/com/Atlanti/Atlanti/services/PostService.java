package com.Atlanti.Atlanti.services;

import com.Atlanti.Atlanti.models.PostModel;
import com.Atlanti.Atlanti.repository.PostRepository;
import org.hibernate.jdbc.Expectation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    public ArrayList<PostModel> obtenerPost(){
        return (ArrayList<PostModel>) postRepository.findAll();

    }
    public PostModel guardarPost(PostModel post){
        post.setEstado("PENDIENTE");
        post.setFechaCreacion(LocalDateTime.now());
        post.setVisible(false);
        return postRepository.save(post);
    }
    public boolean eliminarPost(Long id){
        try{
            postRepository.deleteById(id);
            return true;
        }catch (Exception err){
            return false;
        }
    }
    public PostModel revisarPost(Long id, Long adminId, String observacion, boolean aprobado){

        PostModel post = postRepository.findById(id).orElse(null);

        if(post == null){
            return null;
        }

        if(aprobado){
            post.setEstado("APROBADO");
            post.setFechaPublicacion(LocalDateTime.now());
            post.setVisible(true);
        }else{
            post.setEstado("RECHAZADO");
            post.setVisible(false);
        }

        post.setIdRevisor(adminId);
        post.setObservaciones(observacion);

        return postRepository.save(post);
    }
    public List<PostModel> obtenerPendientes(){
        return postRepository.findByEstado("PENDIENTE");
    }
    public List<PostModel> obtenerAprobados(){
        return postRepository.findByEstado("APROBADO");
    }
    public List<PostModel> obtenerRechazados(){
        return postRepository.findByEstado("RECHAZADO");
    }
    public List<PostModel> obtenerPorUsuario(Long usuarioId) {
        return postRepository.findByUsuarioId(usuarioId);
    }

}
