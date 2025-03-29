package com.example.project2.repository;


import com.example.project2.entity.Kategorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KategorieRepository extends JpaRepository<Kategorie, Long> {
}
