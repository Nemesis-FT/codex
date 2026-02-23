package dev.fermitech.codex.utils;

import dev.fermitech.codex.controllers.dto.UserDTO;
import dev.fermitech.codex.models.User;
import dev.fermitech.codex.utils.Mapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper extends Mapper<User, UserDTO> {
    @Override
    public Class<User> getDaoClass() {
        return User.class;
    }

    @Override
    public Class<UserDTO> getDtoClass(){
        return UserDTO.class;
    }
}
