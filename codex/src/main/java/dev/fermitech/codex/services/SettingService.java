package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.SettingDTO;
import dev.fermitech.codex.models.Setting;
import dev.fermitech.codex.repositories.SettingRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class SettingService {

    @Autowired
    private SettingRepository settingRepository;

    public Long save(Setting vO) {
        Setting bean = new Setting();
        BeanUtils.copyProperties(vO, bean);
        bean = settingRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        settingRepository.deleteById(id);
    }


    public SettingDTO getById(Long id) {
        Setting original = requireOne(id);
        return toDTO(original);
    }

    private SettingDTO toDTO(Setting original) {
        SettingDTO bean = new SettingDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private Setting requireOne(Long id) {
        return settingRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
