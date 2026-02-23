package dev.fermitech.codex.controllers.dto;


import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class DatabasechangeloglockDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private Boolean locked;

    private LocalDateTime lockgranted;

    private String lockedby;

}
