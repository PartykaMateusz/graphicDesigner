package com.graphic.designer.graphicDesigner.web.user.service;

import com.graphic.designer.graphicDesigner.web.role.model.Role;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.exceptions.user.EmailAlreadyExistException;
import com.graphic.designer.graphicDesigner.exceptions.user.UsernameAlreadyExistException;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import javax.management.relation.RelationService;

import java.util.ArrayList;
import java.util.List;

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

    @Test
    public void registerNewUserAccount() {
        User user = this.generateUser();
        user.setUsername("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByUsername("testowy")).thenReturn(java.util.Optional.empty());
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        UserDto userDto = userService.convertToDto(user);
        userDto.setRole(USER);

        UserDto returnedUser = userService.registerNewUserAccount(userDto);

        assertEquals(returnedUser.getUsername(),user.getUsername());
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

        assertThrows(EmailAlreadyExistException.class, () -> userService.registerNewUserAccount(userService.convertToDto(user)));
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

        assertThrows(UsernameAlreadyExistException.class, () -> userService.registerNewUserAccount(userService.convertToDto(user)));
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


}