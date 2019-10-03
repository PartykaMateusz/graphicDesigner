package com.graphic.designer.graphicDesigner.web.user.controller;

import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username,
                                               Principal principal){
        UserDto userDto = userService.findUserByUsername(username);
        if(userDto.getUsername().equals(principal.getName())){
            return new ResponseEntity(userDto, HttpStatus.OK);
        }
        else return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId,
                                        @RequestBody ProfileRequest profileRequest,
                                        Principal principal){

        UserDto tempUserDto = userService.findById(userId);
        if(tempUserDto.getUsername().equals(principal.getName())){
            return new ResponseEntity<>(userService.updateUser(userId, profileRequest),HttpStatus.OK);
        }
        else return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
    }

}
