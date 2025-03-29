package com.example.project2.service;
import com.example.project2.entity.Kategorie;
import com.example.project2.repository.KategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KategorieService {

    private final KategorieRepository kategorieRepository;

    @Autowired
    public KategorieService(KategorieRepository kategorieRepository) {
        this.kategorieRepository = kategorieRepository;
    }

    public Kategorie saveKategoria(Kategorie kategoria) {
        return kategorieRepository.save(kategoria);
    }

    public List<Kategorie> getAllKategorie() {
        return kategorieRepository.findAll();
    }

    public Kategorie getKategoriaById(Long id) {
        return kategorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kategoria o id " + id + " nie istnieje."));
    }

    public List<Kategorie> getKategoriaById(List<Long> kategoriaId) {
        return kategorieRepository.findAllById(kategoriaId);
    }

    public Kategorie updateKategorie(Long id, Kategorie updatedKategorie) {
        Kategorie existingKategoria = kategorieRepository.findById(id)
                .orElseThrow();

        existingKategoria.setNazwa(updatedKategorie.getNazwa());
        existingKategoria.setAdres_sklepu(updatedKategorie.getAdres_sklepu());
        existingKategoria.setCzy_mozliwa_rezerwacja(updatedKategorie.getCzy_mozliwa_rezerwacja());

        return kategorieRepository.save(existingKategoria);
    }

    public boolean deleteKategorie(Long id) {
        if (kategorieRepository.existsById(id)) {
            kategorieRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
