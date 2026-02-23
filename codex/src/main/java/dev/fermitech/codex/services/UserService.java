package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.edit.UserEditDTO;
import dev.fermitech.codex.models.User;
import dev.fermitech.codex.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User create(User user){
        return userRepository.save(user);
    }

    public User update(Long id, UserEditDTO editDTO){
        User target = getById(id);
        target.setUsername(editDTO.getUsername());
        return userRepository.save(target);
    }

    public Page<User> getAllUsersPaged(Pageable pageable){
        return userRepository.findAll(pageable);
    }

    public User getById(Long id){
        return userRepository.findById(id).orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato con l'id specificato.", null)
        );
    }
}
