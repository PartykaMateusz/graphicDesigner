package com.graphic.designer.graphicDesigner.web.user.service;


import com.graphic.designer.graphicDesigner.web.user.dto.ProfileRequest;
import com.graphic.designer.graphicDesigner.web.user.dto.UpdateProfileRequest;
import com.graphic.designer.graphicDesigner.web.user.dto.AvatarDto;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.web.user.model.Avatar;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    UserDto registerNewUserAccount(UserDto userDto);

    boolean isUsernameExist(String login);

    boolean isEmailExists(String email);

    User convertToUserEntity(UserDto accountDto);

    UserDto convertToUserDto(User user);

    ProfileRequest findUserByUsername(String username);

    UserDto findUserById(Long userId);

    UserDto updateUser(Long userId, UpdateProfileRequest profileRequest);

    AvatarDto updateUserAvatar(Long userId, AvatarDto avatarDto);

    AvatarDto getUserAvatar(Long userId);

    AvatarDto convertToAvatarDto(Avatar avatar);
}
