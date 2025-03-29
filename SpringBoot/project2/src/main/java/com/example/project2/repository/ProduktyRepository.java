package com.example.project2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.project2.entity.Produkty;

@Repository
public interface ProduktyRepository extends JpaRepository<Produkty, Long> {

}
