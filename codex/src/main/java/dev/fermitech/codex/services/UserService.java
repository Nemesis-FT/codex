package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.UsrDTO;
import dev.fermitech.codex.controllers.dto.edit.UserEditDTO;
import dev.fermitech.codex.models.User;
import dev.fermitech.codex.models.Usr;
import dev.fermitech.codex.repositories.UserRepository;
import dev.fermitech.codex.repositories.UsrRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.NoSuchElementException;

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

    @Autowired
    private UsrRepository usrRepository;

    public Long save(Usr vO) {
        Usr bean = new Usr();
        BeanUtils.copyProperties(vO, bean);
        bean = usrRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        usrRepository.deleteById(id);
    }


    public UsrDTO getByExtId(String extId) {
        return usrRepository.findByExtId(extId).map(this::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + extId));
    }

    /**
     * Ensures a local user exists for the given AuthMaster user, creating it on first login
     * and keeping the username in sync afterwards.
     */
    @Transactional
    public Usr provision(String extId, String username) {
        Usr usr = usrRepository.findByExtId(extId).orElseGet(() -> {
            Usr created = new Usr();
            created.setExtId(extId);
            created.setFlAdmin(false);
            return created;
        });
        if (usr.getId() == null || (username != null && !username.equals(usr.getUsername()))) {
            usr.setUsername(username);
            usr = usrRepository.save(usr);
        }
        return usr;
    }

    private UsrDTO toDTO(Usr original) {
        UsrDTO bean = new UsrDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private Usr requireOne(Long id) {
        return usrRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
