package com.graphic.designer.graphicDesigner.web.user.service;

import com.graphic.designer.graphicDesigner.web.user.exception.EmailIsUsed;
import com.graphic.designer.graphicDesigner.web.user.exception.LoginIsUsed;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

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

    @Test
    public void registerNewUserAccount() throws EmailIsUsed, LoginIsUsed {
        User user = this.generateUser();
        user.setLogin("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByLogin("testowy")).thenReturn(java.util.Optional.empty());
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        User returnedUser = userService.registerNewUserAccount(user);

        assertEquals(returnedUser.getLogin(),user.getLogin());
    }

    @Test
    public void registerNewUserAccountWhereEmailIsAlreadyUsed() throws EmailIsUsed, LoginIsUsed {
        User user = this.generateUser();
        User userWithSameEmail = this.generateUser();
        user.setLogin("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByLogin("testowy")).thenReturn(java.util.Optional.empty());
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.of(userWithSameEmail));

        assertThrows(EmailIsUsed.class, () -> userService.registerNewUserAccount(user));
    }

    @Test
    public void registerNewUserAccountWhereLoginIsAlreadyUsed() throws EmailIsUsed, LoginIsUsed {
        User user = this.generateUser();
        User userWithSameLogin = this.generateUser();
        user.setLogin("testowy");
        user.setEmail("testowy");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByLogin("testowy")).thenReturn(java.util.Optional.of(userWithSameLogin));
        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        assertThrows(LoginIsUsed.class, () -> userService.registerNewUserAccount(user));
    }

    @Test
    public void loginExistWhenLoginIsPresent() {
        User user = this.generateUser();
        User userWithSameLogin = this.generateUser();
        user.setLogin("testowy");

        when(userRepository.findByLogin("testowy")).thenReturn(java.util.Optional.of(userWithSameLogin));

        assertTrue(userService.loginExist("testowy"));
    }

    @Test
    public void loginExistWhenLoginIsNotPresent() {
        User user = this.generateUser();
        user.setLogin("testowy");

        when(userRepository.findByLogin("testowy")).thenReturn(java.util.Optional.empty());

        assertFalse(userService.loginExist("testowy"));
    }

    @Test
    public void emailExistsWhenEmailIsPresent() {
        User user = this.generateUser();
        User userWithSameEmail = this.generateUser();
        user.setEmail("testowy");

        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.of(userWithSameEmail));

        assertTrue(userService.emailExists("testowy"));
    }

    @Test
    public void emailExistsWhenEmailIsNotPresent() {
        User user = this.generateUser();
        user.setEmail("testowy");

        when(userRepository.findByEmail("testowy")).thenReturn(java.util.Optional.empty());

        assertFalse(userService.emailExists("testowy"));
    }

    private User generateUser() {
        User user = new User();
        user.setId(1L);
        user.setLogin("test");
        user.setPassword("test");
        user.setEmail("test");
        return user;
    }
}