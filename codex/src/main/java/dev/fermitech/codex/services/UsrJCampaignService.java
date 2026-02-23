package dev.fermitech.codex.services;

import dev.fermitech.codex.controllers.dto.UsrJCampaignDTO;
import dev.fermitech.codex.models.UsrJCampaign;
import dev.fermitech.codex.repositories.UsrJCampaignRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UsrJCampaignService {

    @Autowired
    private UsrJCampaignRepository usrJCampaignRepository;

    public Long save(UsrJCampaign vO) {
        UsrJCampaign bean = new UsrJCampaign();
        BeanUtils.copyProperties(vO, bean);
        bean = usrJCampaignRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        usrJCampaignRepository.deleteById(id);
    }


    public UsrJCampaignDTO getById(Long id) {
        UsrJCampaign original = requireOne(id);
        return toDTO(original);
    }

    private UsrJCampaignDTO toDTO(UsrJCampaign original) {
        UsrJCampaignDTO bean = new UsrJCampaignDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private UsrJCampaign requireOne(Long id) {
        return usrJCampaignRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
