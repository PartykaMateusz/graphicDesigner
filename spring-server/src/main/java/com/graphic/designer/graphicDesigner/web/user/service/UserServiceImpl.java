package com.graphic.designer.graphicDesigner.web.user.service;

import com.graphic.designer.graphicDesigner.exceptions.role.RoleException;
import com.graphic.designer.graphicDesigner.exceptions.user.AvatarNotFoundException;
import com.graphic.designer.graphicDesigner.exceptions.user.AvatarTooBigException;
import com.graphic.designer.graphicDesigner.web.role.model.Role;
import com.graphic.designer.graphicDesigner.web.role.repository.RoleRepository;
import com.graphic.designer.graphicDesigner.web.user.controller.ProfileRequest;
import com.graphic.designer.graphicDesigner.web.user.dto.AvatarDto;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.exceptions.user.EmailAlreadyExistException;
import com.graphic.designer.graphicDesigner.exceptions.user.UsernameAlreadyExistException;
import com.graphic.designer.graphicDesigner.web.user.model.Avatar;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.AvatarRepository;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.*;
import static com.graphic.designer.graphicDesigner.constants.ImageConstants.MAX_AVATAR_SIZE;
import static com.graphic.designer.graphicDesigner.constants.RoleConstants.*;

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

    @Autowired
    private AvatarRepository avatarRepository;

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

        User user = convertToUserEntity(userDto);

        if(userDto.getRole() == null){
            throw new RoleException(ROLE_NOT_EXIST);
        }
        else if(userDto.getRole().equals(USER)) {
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

        Avatar defalutAvatar = AvatarFactory.getDefaultAvatar();

        avatarRepository.save(defalutAvatar);
        userRepository.save(user);
        defalutAvatar.setUser(user);
        avatarRepository.save(defalutAvatar);

        user.setAvatar(defalutAvatar);

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
    public User convertToUserEntity(UserDto accountDto) {
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
    public UserDto convertToUserDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        userDto.setRole(this.getRoleFromUserEntity(user));


        //TODO TEST this if
        if(user.getRegisterDate() != null) {
            userDto.setRegisterDate(LocalDate
                    .of(user.getRegisterDate().getYear(),
                            user.getRegisterDate().getMonth(),
                            user.getRegisterDate().getDayOfMonth()));
        }

        return userDto;
    }

    private String getRoleFromUserEntity(User user) {
        List<Role> roles = user.getRoles();

        if(roles != null && roles.size() ==1){
            return roles.get(0).getName();
        }

        //TODO
        return null;
    }

    @Override
    public UserDto findUserByUsername(String username) {
        return convertToUserDto(userRepository.findByUsername(username)
                .orElseThrow((() -> new UsernameNotFoundException(USER_NOT_EXIST))));
    }

    @Override
    public UserDto findUserById(Long userId) {
        return convertToUserDto(userRepository.findById(userId)
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

        return convertToUserDto(userRepository.save(user));
    }

    @Override
    public AvatarDto updateUserAvatar(Long userId, AvatarDto avatarDto) {

        validateAvatarSize(avatarDto);

        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException(USER_NOT_EXIST));
        Avatar avatar = this.convertToAvatarEntity(avatarDto);

        avatar.setUser(user);
        user.setAvatar(avatar);

        avatarRepository.save(avatar);
        userRepository.save(user);

        return this.convertToAvatarDto(avatar);
    }

    private void validateAvatarSize(AvatarDto avatarDto) {
        String[] tempStringSize = avatarDto.getSize().split(" ");
        float imageSize = Float.parseFloat(tempStringSize[0]);

        if(imageSize > MAX_AVATAR_SIZE){
            throw new AvatarTooBigException(AVATAR_TOO_BIG);
        }
    }

    @Override
    public AvatarDto getUserAvatar(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException(USER_NOT_EXIST));

        if(user.getAvatar() != null){
            return convertToAvatarDto(user.getAvatar());
        }
        else{
            throw new AvatarNotFoundException(AVATAR_NOT_EXIST);
        }
    }

    @Override
    public AvatarDto convertToAvatarDto(Avatar avatar) {
        AvatarDto avatarDto = modelMapper.map(avatar, AvatarDto.class);
        return avatarDto;
    }

    public Avatar convertToAvatarEntity(AvatarDto avatarDto) {

        Avatar avatar = modelMapper.map(avatarDto, Avatar.class);

        if(avatarDto.getId() != null){
            avatar.setAvatar_id(avatarDto.getId());
        }
        return avatar;
    }

}
