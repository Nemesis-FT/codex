package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.WorldDTO;
import dev.fermitech.codex.models.World;
import dev.fermitech.codex.repositories.WorldRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class WorldService {

    @Autowired
    private WorldRepository worldRepository;

    public Long save(World vO) {
        World bean = new World();
        BeanUtils.copyProperties(vO, bean);
        bean = worldRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        worldRepository.deleteById(id);
    }


    public WorldDTO getById(Long id) {
        World original = requireOne(id);
        return toDTO(original);
    }

    private WorldDTO toDTO(World original) {
        WorldDTO bean = new WorldDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private World requireOne(Long id) {
        return worldRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
