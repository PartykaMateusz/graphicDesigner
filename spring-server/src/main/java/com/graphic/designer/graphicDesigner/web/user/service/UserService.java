package com.graphic.designer.graphicDesigner.web.user.service;


import com.graphic.designer.graphicDesigner.web.user.controller.ProfileRequest;
import com.graphic.designer.graphicDesigner.web.user.dto.AvatarDto;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    UserDto registerNewUserAccount(UserDto userDto);

    boolean isUsernameExist(String login);

    boolean isEmailExists(String email);

    User convertToUserEntity(UserDto accountDto);

    UserDto convertToUserDto(User user);

    UserDto findUserByUsername(String username);

    UserDto findById(Long userId);

    UserDto updateUser(Long userId, ProfileRequest profileRequest);

    AvatarDto updateUserAvatar(Long userId, AvatarDto avatarDto);

    AvatarDto getUserAvatar(Long userId);
}
