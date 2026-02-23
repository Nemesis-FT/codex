package dev.fermitech.codex.controllers.dto.edit;

import dev.fermitech.codex.controllers.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserEditDTO extends BaseDTO {
    public String username;
}
