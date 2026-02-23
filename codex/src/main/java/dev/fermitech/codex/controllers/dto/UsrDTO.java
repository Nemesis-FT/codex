package dev.fermitech.codex.controllers.dto;


import lombok.Data;

import java.io.Serializable;

@Data
public class UsrDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private String extId;

    private String username;

    private Boolean flAdmin;

}
