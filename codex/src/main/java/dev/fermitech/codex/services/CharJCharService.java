package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.CharJCharDTO;
import dev.fermitech.codex.models.CharJChar;
import dev.fermitech.codex.repositories.CharJCharRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CharJCharService {

    @Autowired
    private CharJCharRepository charJCharRepository;

    public Long save(CharJChar vO) {
        CharJChar bean = new CharJChar();
        BeanUtils.copyProperties(vO, bean);
        bean = charJCharRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        charJCharRepository.deleteById(id);
    }

    public CharJCharDTO getById(Long id) {
        CharJChar original = requireOne(id);
        return toDTO(original);
    }

    private CharJCharDTO toDTO(CharJChar original) {
        CharJCharDTO bean = new CharJCharDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private CharJChar requireOne(Long id) {
        return charJCharRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
