package com.graphic.designer.graphicDesigner.web.user.service;

import com.graphic.designer.graphicDesigner.web.user.exception.EmailIsUsed;
import com.graphic.designer.graphicDesigner.web.user.exception.LoginIsUsed;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User registerNewUserAccount(User user) throws EmailIsUsed, LoginIsUsed;

    boolean loginExist(String login);

    boolean emailExists(String email);
}
