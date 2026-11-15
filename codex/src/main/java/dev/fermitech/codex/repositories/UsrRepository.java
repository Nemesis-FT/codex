package dev.fermitech.codex.repositories;

import dev.fermitech.codex.models.Usr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UsrRepository extends JpaRepository<Usr, Long>, JpaSpecificationExecutor<Usr> {
    Optional<Usr> findByExtId(String extId);
}