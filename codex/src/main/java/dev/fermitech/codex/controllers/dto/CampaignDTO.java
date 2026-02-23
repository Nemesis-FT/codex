package dev.fermitech.codex.controllers.dto;


import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
public class CampaignDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private String name;

    private LocalDate startDate;

    private LocalDate endDate;

    private String synopsis;

    private String retelling;

    private Long masterUsrId;

}
