package dev.fermitech.codex.controllers.dto;


import lombok.Data;

import java.io.Serializable;

@Data
public class SettingDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private Long timeframeStart;

    private Long timeframeEnd;

    private String content;

    private Long ownerUsrId;

    private Long worldId;

}
