package dev.fermitech.codex.controllers.dto;


import lombok.Data;

import java.io.Serializable;

@Data
public class CharacterDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private String name;

    private String race;

    private String backstory;

    private Long dob;

    private Long dod;

    private Long usrId;

    private Long extCharId;

}
