package com.graphic.designer.graphicDesigner.web.user.service;

import com.graphic.designer.graphicDesigner.exceptions.role.RoleException;
import com.graphic.designer.graphicDesigner.exceptions.user.AvatarNotFoundException;
import com.graphic.designer.graphicDesigner.exceptions.user.AvatarTooBigException;
import com.graphic.designer.graphicDesigner.web.user.dto.ProfileRequest;
import com.graphic.designer.graphicDesigner.web.user.dto.AvatarDto;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.exceptions.user.EmailAlreadyExistException;
import com.graphic.designer.graphicDesigner.exceptions.user.UsernameAlreadyExistException;
import com.graphic.designer.graphicDesigner.web.user.model.Avatar;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.AvatarRepository;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;

import static com.graphic.designer.graphicDesigner.constants.ImageConstants.MAX_AVATAR_SIZE;
import static com.graphic.designer.graphicDesigner.constants.RoleConstants.DESIGNER;
import static com.graphic.designer.graphicDesigner.constants.RoleConstants.USER;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {

    @Autowired
    UserService userService;

    @MockBean
    UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @MockBean
    private UserDto userDtoMock;

    @MockBean
    private AvatarRepository avatarRepository;

    @Test
    public void registerNewUserAccount() {
        User user = this.generateUser();
        user.setUsername("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByUsername("testowy")).thenReturn(java.util.Optional.empty());
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        UserDto userDto = userService.convertToUserDto(user);
        userDto.setRole(USER);

        UserDto returnedUser = userService.registerNewUserAccount(userDto);

        assertEquals(returnedUser.getUsername(), user.getUsername());
    }

    @Test
    public void registerNewDesignerAccount() {
        User user = this.generateUser();
        user.setUsername("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByUsername("testowy")).thenReturn(java.util.Optional.empty());
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        UserDto userDto = userService.convertToUserDto(user);
        userDto.setRole(DESIGNER);

        UserDto returnedUser = userService.registerNewUserAccount(userDto);

        assertEquals(returnedUser.getUsername(), user.getUsername());

    }

    @Test
    public void registerNewAccountWhereRoleIsNotSet() {
        User user = this.generateUser();
        user.setUsername("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByUsername("testowy")).thenReturn(java.util.Optional.empty());
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        UserDto userDto = userService.convertToUserDto(user);

        assertThrows(RoleException.class, () -> userService.registerNewUserAccount(userDto));
    }

    @Test
    public void registerNewAccountWhereRoleIsInvalid() {
        User user = this.generateUser();
        user.setUsername("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByUsername("testowy")).thenReturn(java.util.Optional.empty());
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        UserDto userDto = userService.convertToUserDto(user);
        userDto.setRole("other");

        assertThrows(RoleException.class, () -> userService.registerNewUserAccount(userDto));
    }

    @Test
    public void registerNewUserAccountWhereEmailIsAlreadyUsed() throws EmailAlreadyExistException, UsernameAlreadyExistException {
        User user = this.generateUser();
        User userWithSameEmail = this.generateUser();
        user.setUsername("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByUsername("testowy")).thenReturn(java.util.Optional.empty());
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.of(userWithSameEmail));

        assertThrows(EmailAlreadyExistException.class, () -> userService.registerNewUserAccount(userService.convertToUserDto(user)));
    }


    @Test
    public void registerNewUserAccountWhereLoginIsAlreadyUsed() throws EmailAlreadyExistException, UsernameAlreadyExistException {
        User user = this.generateUser();
        User userWithSameLogin = this.generateUser();
        user.setUsername("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByUsername("testowy")).thenReturn(java.util.Optional.of(userWithSameLogin));
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        assertThrows(UsernameAlreadyExistException.class, () -> userService.registerNewUserAccount(userService.convertToUserDto(user)));
    }

    @Test
    public void loginExistWhenLoginIsPresent() {
        User user = this.generateUser();
        User userWithSameLogin = this.generateUser();
        user.setUsername("testowy");

        when(userRepository.findByUsername("testowy")).thenReturn(java.util.Optional.of(userWithSameLogin));

        assertTrue(userService.isUsernameExist("testowy"));
    }

    @Test
    public void loginExistWhenLoginIsNotPresent() {
        User user = this.generateUser();
        user.setUsername("testowy");

        when(userRepository.findByUsername("testowy")).thenReturn(java.util.Optional.empty());

        assertFalse(userService.isEmailExists("testowy"));
    }

    @Test
    public void emailExistsWhenEmailIsPresent() {
        User user = this.generateUser();
        User userWithSameEmail = this.generateUser();
        user.setEmail("testowy");

        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.of(userWithSameEmail));

        assertTrue(userService.isEmailExists("testowy"));
    }

    @Test
    public void emailExistsWhenEmailIsNotPresent() {
        User user = this.generateUser();
        user.setEmail("testowy");

        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        assertFalse(userService.isEmailExists("testowy"));
    }

    private User generateUser() {
        User user = new User();
        user.setId(1L);
        user.setUsername("test");
        user.setPassword("test");
        user.setEmail("test");
        return user;
    }


    @Test
    public void updateUser() {
        User user = this.generateUser();
        user.setId(1L);
        user.setEmail("test");
        user.setUsername("test");

        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        ProfileRequest profileRequest = new ProfileRequest();
        profileRequest.setUsername("test");
        profileRequest.setEmail("other");
        profileRequest.setFirstName("other");
        profileRequest.setLastName("other");
        profileRequest.setTelNumber("other");

        UserDto returnedUser = userService.updateUser(1L,profileRequest);

        assertEquals(returnedUser.getEmail(), profileRequest.getEmail());
        assertEquals(returnedUser.getFirstName(), profileRequest.getFirstName());
        assertEquals(returnedUser.getLastName(), profileRequest.getLastName());
        assertEquals(returnedUser.getTelNumber(), profileRequest.getTelNumber());

        //username is not changed
        assertEquals(returnedUser.getUsername(), user.getUsername());

    }

    @Test
    public void updateUserAvatar() {
        User user = this.generateUser();
        user.setId(1L);
        user.setEmail("test");
        user.setUsername("test");

        Avatar avatar = this.generateAvatar();

        user.setAvatar(avatar);
        avatar.setUser(user);

        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(user));
        when(avatarRepository.save(avatar)).thenReturn(avatar);

        AvatarDto tempAvatarDto = userService.convertToAvatarDto(avatar);


        assertEquals(userService.updateUserAvatar(user.getId(),tempAvatarDto).getName(),avatar.getName());
    }

    @Test
    public void updateUserAvatarWhereImageIsTooBig() {
        User user = this.generateUser();
        user.setId(1L);
        user.setEmail("test");
        user.setUsername("test");

        Avatar avatar = this.generateAvatar();

        float tempAvatarSize = MAX_AVATAR_SIZE + 1000;
        avatar.setSize(tempAvatarSize+" kb");

        user.setAvatar(avatar);
        avatar.setUser(user);

        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(user));

        AvatarDto tempAvatarDto = userService.convertToAvatarDto(avatar);

        assertThrows(AvatarTooBigException.class, () -> userService.updateUserAvatar(user.getId(),tempAvatarDto));
    }

    private Avatar generateAvatar() {

        Avatar avatar = new Avatar();
        avatar.setAvatar_id(1L);
        avatar.setBase64("test");
        avatar.setName("test");
        avatar.setSize("256 kb");
        avatar.setType("png");

        return avatar;
    }

    @Test
    public void getUserAvatar() {
        User user = this.generateUser();
        user.setId(1L);

        Avatar avatar = this.generateAvatar();
        user.setAvatar(avatar);

        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(user));

        assertEquals(userService.getUserAvatar(user.getId()).getName(),avatar.getName());
    }

    @Test
    public void getUserAvatarWhenAvatarNotExist() {
        User user = this.generateUser();
        user.setId(1L);

        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(user));

        assertThrows(AvatarNotFoundException.class, () -> userService.getUserAvatar(user.getId()));
    }

    @Test
    public void findUserById(){
        User user = this.generateUser();
        user.setId(1L);
        user.setUsername("test");

        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(user));

        assertEquals(userService.findUserById(user.getId()).getUsername(),user.getUsername());
    }

    @Test
    public void findUserByUsername(){
        User user = this.generateUser();
        user.setId(1L);
        user.setUsername("test");

        when(userRepository.findByUsername("test")).thenReturn(java.util.Optional.of(user));

        assertEquals(userService.findUserByUsername(user.getUsername()).getUsername(),user.getUsername());
    }

    @Test
    public void convertToUserDto() {
        User user = new User();
        user.setRegisterDate(LocalDateTime.now());
        user.setAvatar(this.generateAvatar());

        UserDto returnedDto = userService.convertToUserDto(user);

        assertEquals(returnedDto.getUsername(),user.getUsername());
        assertEquals(returnedDto.getFirstName(),user.getFirstName());
        assertEquals(returnedDto.getLastName(),user.getLastName());
        assertEquals(returnedDto.getRegisterDate().getDayOfYear(),user.getRegisterDate().getDayOfYear());
        assertEquals(returnedDto.getTelNumber(),user.getTelNumber());
        assertEquals(returnedDto.getEmail(),user.getEmail());
        assertEquals(returnedDto.getAvatar().getBase64(),user.getAvatar().getBase64());

    }


}