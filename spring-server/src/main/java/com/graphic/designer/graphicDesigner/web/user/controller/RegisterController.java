package com.graphic.designer.graphicDesigner.web.user.controller;

import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.web.user.exception.EmailIsUsed;
import com.graphic.designer.graphicDesigner.web.user.exception.LoginIsUsed;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class RegisterController {

    @Autowired
    UserService userService;

    @Autowired
    ModelMapper modelMapper;

    @PostMapping("/register/user")
    public ResponseEntity<?> register(@RequestBody @Valid UserDto accountDto){

        System.out.println(accountDto+" hehe");

        try {
            User user = convertToEntity(accountDto);
            return new ResponseEntity<>(this.convertToDto(userService.registerNewUserAccount(user)), HttpStatus.CREATED);

        } catch (EmailIsUsed emailIsUsed) {
            return new ResponseEntity<>("email already exist",HttpStatus.NOT_ACCEPTABLE);

        } catch (LoginIsUsed loginIsUsed) {
            return new ResponseEntity<>("login already exist",HttpStatus.NOT_ACCEPTABLE);
        }

    }

    protected User convertToEntity(UserDto accountDto) {
        User user = modelMapper.map(accountDto, User.class);

        if(accountDto.getId() != null){
            user.setId(accountDto.getId());
        }
        user.setLogin(accountDto.getLogin());
        user.setPassword(accountDto.getPassword());
        user.setEmail(accountDto.getEmail());

        return user;
    }

    protected UserDto convertToDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }
}
