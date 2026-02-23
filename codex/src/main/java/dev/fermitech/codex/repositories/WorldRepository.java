package dev.fermitech.codex.repositories;

import dev.fermitech.codex.models.World;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WorldRepository extends JpaRepository<World, Long>, JpaSpecificationExecutor<World> {

}