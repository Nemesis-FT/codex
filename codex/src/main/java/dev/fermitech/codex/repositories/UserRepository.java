package dev.fermitech.codex.repositories;

import dev.fermitech.codex.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
