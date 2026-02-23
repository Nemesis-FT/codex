package dev.fermitech.codex.repositories;

import dev.fermitech.codex.models.CharJChar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CharJCharRepository extends JpaRepository<CharJChar, Long>, JpaSpecificationExecutor<CharJChar> {

}