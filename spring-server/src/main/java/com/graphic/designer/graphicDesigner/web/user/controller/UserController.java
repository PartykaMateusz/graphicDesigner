package com.graphic.designer.graphicDesigner.web.user.controller;

import com.graphic.designer.graphicDesigner.web.user.dto.AvatarDto;
import com.graphic.designer.graphicDesigner.web.user.dto.ProfileRequest;
import com.graphic.designer.graphicDesigner.web.user.dto.UpdateProfileRequest;
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
        ProfileRequest profileRequest = userService.findUserByUsername(username);
        if(profileRequest.getUsername().equals(principal.getName())){
            return new ResponseEntity(profileRequest, HttpStatus.OK);
        }
        else return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId,
                                        @RequestBody UpdateProfileRequest profileRequest,
                                        Principal principal){


        ProfileRequest tempProfileRequest = userService.findUserById(userId);
        if(tempProfileRequest.getUsername().equals(principal.getName())){
            return new ResponseEntity<>(userService.updateUser(userId, profileRequest),HttpStatus.OK);
        }
        else return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
    }

    @PutMapping("/{userId}/avatar")
    public ResponseEntity<?> updateUserAvatar(@PathVariable Long userId,
                                              @RequestBody AvatarDto avatarDto){

        //TODO principal
        return new ResponseEntity<>(userService.updateUserAvatar(userId,avatarDto),HttpStatus.OK);
    }

    @GetMapping("/{userId}/avatar")
    public ResponseEntity<?> GetUserAvatar(@PathVariable Long userId){

        //TODO principal
        return new ResponseEntity<>(userService.getUserAvatar(userId),HttpStatus.OK);
    }

}
