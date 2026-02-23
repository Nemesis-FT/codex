package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.CampaignDTO;
import dev.fermitech.codex.models.Campaign;
import dev.fermitech.codex.repositories.CampaignRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    public Long save(Campaign vO) {
        Campaign bean = new Campaign();
        BeanUtils.copyProperties(vO, bean);
        bean = campaignRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        campaignRepository.deleteById(id);
    }

    public CampaignDTO getById(Long id) {
        Campaign original = requireOne(id);
        return toDTO(original);
    }

    private CampaignDTO toDTO(Campaign original) {
        CampaignDTO bean = new CampaignDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private Campaign requireOne(Long id) {
        return campaignRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
