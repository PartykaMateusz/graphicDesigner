package com.graphic.designer.graphicDesigner.web.user.service;

import com.graphic.designer.graphicDesigner.exceptions.role.RoleException;
import com.graphic.designer.graphicDesigner.web.role.repository.RoleRepository;
import com.graphic.designer.graphicDesigner.web.user.controller.ProfileRequest;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.exceptions.user.EmailAlreadyExistException;
import com.graphic.designer.graphicDesigner.exceptions.user.UsernameAlreadyExistException;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.*;
import static com.graphic.designer.graphicDesigner.constants.RoleConstants.DESIGNER;
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

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public UserDto registerNewUserAccount(UserDto userDto)  {

        log.trace("register new User Account");

        if (isUsernameExist(userDto.getUsername())) {
            throw new UsernameAlreadyExistException(LOGIN_IS_ALREADY_USED);
        }
        if(isEmailExists(userDto.getEmail())){
            throw new EmailAlreadyExistException(EMAIL_IS_ALREADY_USED);
        }

        User user = convertToEntity(userDto);

        if(userDto.getRole().equals(USER)) {
            user.setRoles(Arrays.asList(roleRepository.findByName(USER).orElseThrow(()->new RoleException(ROLE_NOT_EXIST))));
        }
        else if(userDto.getRole().equals(DESIGNER)) {
            user.setRoles(Arrays.asList(roleRepository.findByName(DESIGNER).orElseThrow(()->new RoleException(ROLE_NOT_EXIST))));
        }
        else{
            throw new RoleException(ROLE_NOT_EXIST);
        }

        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        user.setRegisterDate(LocalDateTime.now());

        userRepository.save(user);

        log.info("user with role "+userDto.getRole()+", id: "+user.getId()+", username: "+user.getUsername() + ", email: "+user.getEmail()+ " has been saved in db");
        //TODO return dto with ID
        return userDto;
    }

    @Override
    public boolean isUsernameExist(String login) {
        Optional<User> optionalUser = userRepository.findByUsername(login);
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
        user.setUsername(accountDto.getUsername());
        user.setPassword(accountDto.getPassword());
        user.setEmail(accountDto.getEmail());

        return user;
    }

    @Override
    public UserDto convertToDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }

    @Override
    public UserDto findUserByUsername(String username) {
        return convertToDto(userRepository.findByUsername(username)
                .orElseThrow((() -> new UsernameNotFoundException(USER_NOT_EXIST))));
    }

    @Override
    public UserDto findById(Long userId) {
        return convertToDto(userRepository.findById(userId)
                .orElseThrow((() -> new UsernameNotFoundException(USER_NOT_EXIST))));
    }

    @Override
    public UserDto updateUser(Long userId, ProfileRequest profileRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow((() -> new UsernameNotFoundException(USER_NOT_EXIST)));

        if(profileRequest.getUsername() != null) user.setUsername(profileRequest.getUsername());
        if(profileRequest.getEmail() != null) user.setEmail(profileRequest.getEmail());
        if(profileRequest.getFirstName() != null) user.setFirstName(profileRequest.getFirstName());
        if(profileRequest.getLastName() != null) user.setLastName(profileRequest.getLastName());
        if(profileRequest.getTelNumber() != null) user.setTelNumber(profileRequest.getTelNumber());

        if(profileRequest.getAvatar() != null) {
            String avatar = this.encodeToString(profileRequest.getAvatar());
            user.setAvatar(avatar);
        }

        return convertToDto(userRepository.save(user));
    }

    private String encodeToString(byte[] imageByteArray) {
        return Base64.encodeBase64URLSafeString(imageByteArray);
    }
}
