package dev.fermitech.codex.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO extends BaseDTO {
    private String id;
    private String username;
    private String remote_uid;
}
