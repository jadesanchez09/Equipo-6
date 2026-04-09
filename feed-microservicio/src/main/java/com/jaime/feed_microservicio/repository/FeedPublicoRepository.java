package com.jaime.feed_microservicio.repository;

import com.jaime.feed_microservicio.entity.FeedPublico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedPublicoRepository extends JpaRepository<FeedPublico, Long> {

    List<FeedPublico> findByVisibleTrueOrderByFechaPublicacionDesc();
}