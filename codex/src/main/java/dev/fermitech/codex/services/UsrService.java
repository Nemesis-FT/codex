package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.UsrDTO;
import dev.fermitech.codex.models.Usr;
import dev.fermitech.codex.repositories.UsrRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UsrService {

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


    public UsrDTO getById(Long id) {
        Usr original = requireOne(id);
        return toDTO(original);
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
