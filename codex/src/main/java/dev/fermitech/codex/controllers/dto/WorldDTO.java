package dev.fermitech.codex.controllers.dto;


import lombok.Data;

import java.io.Serializable;

@Data
public class WorldDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private String name;

    private String description;

    private Long extWorldId;

    private Long ownerUsrId;

}
