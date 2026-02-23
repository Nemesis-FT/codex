package dev.fermitech.codex.controllers.dto;


import lombok.Data;

import java.io.Serializable;

@Data
public class CharJCharDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private Long leftCharId;

    private Long rightCharId;

    private String kind;

}
