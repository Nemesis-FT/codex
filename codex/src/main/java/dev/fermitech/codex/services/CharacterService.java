package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.CharacterDTO;
import dev.fermitech.codex.models.Character;
import dev.fermitech.codex.repositories.CharacterRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CharacterService {

    @Autowired
    private CharacterRepository characterRepository;

    public Long save(Character vO) {
        Character bean = new Character();
        BeanUtils.copyProperties(vO, bean);
        bean = characterRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        characterRepository.deleteById(id);
    }


    public CharacterDTO getById(Long id) {
        Character original = requireOne(id);
        return toDTO(original);
    }

    private CharacterDTO toDTO(Character original) {
        CharacterDTO bean = new CharacterDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private Character requireOne(Long id) {
        return characterRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
