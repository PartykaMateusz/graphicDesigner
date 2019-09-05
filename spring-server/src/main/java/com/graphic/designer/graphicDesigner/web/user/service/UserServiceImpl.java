package com.graphic.designer.graphicDesigner.web.user.service;

import com.graphic.designer.graphicDesigner.web.role.repository.RoleRepository;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.exceptions.user.EmailAlreadyExistException;
import com.graphic.designer.graphicDesigner.exceptions.user.LoginAlreadyExistException;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

import static com.graphic.designer.graphicDesigner.constants.RoleConstants.USER;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDto registerNewUserAccount(UserDto userDto)  {

        if (isLoginExist(userDto.getLogin())) {
            throw new LoginAlreadyExistException("login is already used");

        }
        if(isEmailExists(userDto.getEmail())){
            throw new EmailAlreadyExistException("email is already used");
        }

        User user = convertToEntity(userDto);

        user.setRoles(Arrays.asList(roleRepository.findByName(USER)));
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        userRepository.save(user);

        return userDto;
    }

    @Override
    public boolean isLoginExist(String login) {
        Optional<User> optionalUser = userRepository.findByLogin(login);
        if (optionalUser.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public boolean isEmailExists(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public User convertToEntity(UserDto accountDto) {
        User user = modelMapper.map(accountDto, User.class);

        if(accountDto.getId() != null){
            user.setId(accountDto.getId());
        }
        user.setLogin(accountDto.getLogin());
        user.setPassword(accountDto.getPassword());
        user.setEmail(accountDto.getEmail());

        return user;
    }

    @Override
    public UserDto convertToDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }
}
