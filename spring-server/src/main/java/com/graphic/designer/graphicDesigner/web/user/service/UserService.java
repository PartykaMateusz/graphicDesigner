package com.graphic.designer.graphicDesigner.web.user.service;


import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    UserDto registerNewUserAccount(UserDto userDto);

    boolean isEmailExists(String email);

    User convertToEntity(UserDto accountDto);

    UserDto convertToDto(User user);

    boolean isLoginExist(String testowy);
}
