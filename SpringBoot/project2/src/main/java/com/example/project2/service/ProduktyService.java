package com.example.project2.service;

import com.example.project2.entity.Kategorie;
import com.example.project2.entity.Produkty;
import com.example.project2.repository.KategorieRepository;
import com.example.project2.repository.ProduktyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduktyService {

    private final ProduktyRepository produktyRepository;
    private final KategorieService kategorieService;

    @Autowired
    public ProduktyService(ProduktyRepository produktyRepository, KategorieService kategorieService) {
        this.produktyRepository = produktyRepository;
        this.kategorieService = kategorieService;
    }

    public Produkty createOrUpdateProdukty(Produkty produkty) {
        if (produkty.getKategoriaId() != null) {
            Kategorie kategoria = kategorieService.getKategoriaById(produkty.getKategoriaId());
            produkty.setKategoria(kategoria);
        }
        return produktyRepository.save(produkty);
    }


    public List<Produkty> getAllProdukty() {
        return produktyRepository.findAll();
    }

    public Produkty getProduktById(Long id) {
        return produktyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produkt o id " + id + " nie istnieje."));
    }

    public boolean deleteProdukt(Long id) {
        if (produktyRepository.existsById(id)) {
            produktyRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

