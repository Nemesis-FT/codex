package dev.fermitech.codex.repositories;

import dev.fermitech.codex.models.CharHist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CharHistRepository extends JpaRepository<CharHist, Long>, JpaSpecificationExecutor<CharHist> {

}