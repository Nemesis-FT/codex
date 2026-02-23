package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.CharHistDTO;
import dev.fermitech.codex.models.CharHist;
import dev.fermitech.codex.repositories.CharHistRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CharHistService {

    @Autowired
    private CharHistRepository charHistRepository;

    public Long save(CharHist vO) {
        CharHist bean = new CharHist();
        BeanUtils.copyProperties(vO, bean);
        bean = charHistRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        charHistRepository.deleteById(id);
    }

    public CharHistDTO getById(Long id) {
        CharHist original = requireOne(id);
        return toDTO(original);
    }

    private CharHistDTO toDTO(CharHist original) {
        CharHistDTO bean = new CharHistDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private CharHist requireOne(Long id) {
        return charHistRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
