package com.graphic.designer.graphicDesigner.web.user.service;

import com.graphic.designer.graphicDesigner.web.role.repository.RoleRepository;
import com.graphic.designer.graphicDesigner.web.user.exception.EmailIsUsed;
import com.graphic.designer.graphicDesigner.web.user.exception.LoginIsUsed;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User registerNewUserAccount(User user) throws EmailIsUsed, LoginIsUsed {
        
        if (emailExists(user.getEmail())) {
            throw new EmailIsUsed("email is already used");
        }
        if(loginExist(user.getLogin())){
            throw new LoginIsUsed("login is already user");
        }

        user.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER")));

        return userRepository.save(user);
    }

    @Override
    public boolean loginExist(String login) {
        Optional<User> optionalUser = userRepository.findByLogin(login);
        if (optionalUser.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public boolean emailExists(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            return true;
        }
        return false;
    }
}
