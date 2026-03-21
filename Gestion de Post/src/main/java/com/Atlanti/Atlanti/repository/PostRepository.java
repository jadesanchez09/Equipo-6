package com.Atlanti.Atlanti.repository;

import com.Atlanti.Atlanti.models.PostModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository

public interface PostRepository extends CrudRepository<PostModel, Long> {
    public abstract ArrayList<PostModel> findByEstado(String estado);
    List<PostModel> findByUsuarioId(Long usuarioId);
    List<PostModel> id(Long id);
}
