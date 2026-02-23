package dev.fermitech.codex.utils;

import dev.fermitech.codex.controllers.dto.UserDTO;
import dev.fermitech.codex.controllers.dto.edit.UserEditDTO;
import dev.fermitech.codex.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserEditMapper extends Mapper<User, UserEditDTO> {
    @Override
    public Class<User> getDaoClass() {
        return User.class;
    }

    @Override
    public Class<UserEditDTO> getDtoClass(){
        return UserEditDTO.class;
    }
}
