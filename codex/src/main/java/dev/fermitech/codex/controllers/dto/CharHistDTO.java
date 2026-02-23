package dev.fermitech.codex.controllers.dto;


import lombok.Data;

import java.io.Serializable;

@Data
public class CharHistDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private Long charId;

    private Long campaignId;

    private Long timeframe;

    private Long order;

    private String content;

}
