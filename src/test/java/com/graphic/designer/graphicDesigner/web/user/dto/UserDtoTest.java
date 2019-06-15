package com.graphic.designer.graphicDesigner.web.user.dto;

import com.graphic.designer.graphicDesigner.web.user.model.User;
import org.junit.Test;
import org.modelmapper.ModelMapper;

import static org.junit.Assert.*;

public class UserDtoTest {
    private ModelMapper modelMapper = new ModelMapper();

    @Test
    public void whenConvertPostEntityToPostDto_thenCorrect() {
        User user = new User();
        user.setId(Long.valueOf(1));
        user.setLogin("test");
        user.setPassword("test");

        UserDto userDto = modelMapper.map(user, UserDto.class);
       assertEquals(user.getId(), userDto.getId());
        assertEquals(user.getLogin(), userDto.getLogin());
        assertEquals(user.getPassword(), userDto.getPassword());
    }

    @Test
    public void whenConvertPostDtoToPostEntity_thenCorrect() {
        UserDto userDto = new UserDto();
        userDto.setId(Long.valueOf(1));
        userDto.setLogin("test");
        userDto.setPassword("www.test.com");

        User user = modelMapper.map(userDto, User.class);
        assertEquals(userDto.getId(), user.getId());
        assertEquals(userDto.getLogin(), user.getLogin());
        assertEquals(userDto.getPassword(), user.getPassword());
    }
}