package dev.fermitech.codex.controllers.dto;


import lombok.Data;

import java.io.Serializable;

@Data
public class UsrJCampaignDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private Long usrId;

    private Long campaignId;

    private Long characterId;

}
