package dev.fermitech.codex.controllers;

import dev.fermitech.codex.controllers.dto.UserDTO;
import dev.fermitech.codex.controllers.dto.edit.UserEditDTO;
import dev.fermitech.codex.models.User;
import dev.fermitech.codex.services.UserService;
import dev.fermitech.codex.utils.UserEditMapper;
import dev.fermitech.codex.utils.UserMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@Tag(name = "User")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserEditMapper userEditMapper;

    @GetMapping("")
    public Page<UserDTO> getUsers(@RequestParam(value = "page", defaultValue = "0") int page,
                                  @RequestParam(value = "size", defaultValue = "10") int size,
                                  @RequestParam(value = "order", defaultValue = "ASC") Sort.Direction sortOrder,
                                  @RequestParam(value = "orderBy", defaultValue = "id") String orderBy){
        return userMapper.toDTOPage(userService.getAllUsersPaged(PageRequest.of(page, size, Sort.by(sortOrder, orderBy))));
    }

    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id){
        return userMapper.toDTO(userService.getById(id));
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Long id, @RequestBody UserEditDTO dto){
        return userMapper.toDTO(
                userService.update(id, dto)
        );
    }

    @PostMapping("")
    public UserDTO createUser(@RequestBody UserEditDTO userEdit){
        return userMapper.toDTO(userService.create(userEditMapper.toDAO(userEdit)));
    }
}
