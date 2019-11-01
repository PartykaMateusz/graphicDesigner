package com.graphic.designer.graphicDesigner.web.user.dto;

import com.graphic.designer.graphicDesigner.web.user.model.User;
import org.junit.Test;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.Assert.*;

public class UserDtoTest {
    private ModelMapper modelMapper = new ModelMapper();

    @Test
    public void whenConvertUserEntityToUserDto_thenCorrect() {
        User user = new User();
        user.setId(1L);
        user.setUsername("test");
        user.setPassword("test");

        UserDto userDto = modelMapper.map(user, UserDto.class);
        assertEquals(user.getId(), userDto.getId());
        assertEquals(user.getUsername(), userDto.getUsername());
        assertEquals(user.getPassword(), userDto.getPassword());

    }

    @Test
    public void whenConvertUserDtoToUserEntity_thenCorrect() {
        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setUsername("test");
        userDto.setPassword("www.test.com");
        userDto.setRegisterDate(LocalDate.of(2020,1,1));

        User user = modelMapper.map(userDto, User.class);
        assertEquals(userDto.getId(), user.getId());
        assertEquals(userDto.getUsername(), user.getUsername());
        assertEquals(userDto.getPassword(), user.getPassword());

    }
}