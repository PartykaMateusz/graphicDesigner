package com.graphic.designer.graphicDesigner.web.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.exceptions.user.EmailAlreadyExistException;
import com.graphic.designer.graphicDesigner.exceptions.user.UsernameAlreadyExistException;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RegisterControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private RegisterController registerController;

    @MockBean
    UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @Before
    public void setUp(){
        mockMvc = MockMvcBuilders.standaloneSetup(registerController)
                .build();
    }

    @Test
    public void register() throws Exception, EmailAlreadyExistException, UsernameAlreadyExistException {

        UserDto userDto = new UserDto();
        userDto.setUsername("test222");
        userDto.setPassword("tes341t");
        userDto.setEmail("test@tes55t.pl");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson= ow.writeValueAsString(userDto);

        User generatedUser = this.convertToEntity(userDto);

        when(userService.registerNewUserAccount
                (userService.convertToUserDto(generatedUser)))
                 .thenReturn(userService.convertToUserDto(generatedUser));

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/register")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(requestJson)

        )
                .andExpect(MockMvcResultMatchers.status().isCreated());

    }

    private User generateUser() {
        User user = new User();
        user.setId(1L);
        user.setUsername("test");
        user.setPassword("test");
        user.setEmail("test");
        return user;
    }

    protected User convertToEntity(UserDto accountDto) {
        User user = modelMapper.map(accountDto, User.class);

        if(accountDto.getId() != null){
            user.setId(accountDto.getId());
        }
        user.setUsername(accountDto.getUsername());
        user.setPassword(accountDto.getPassword());
        user.setEmail(accountDto.getEmail());

        return user;
    }

    protected UserDto convertToDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }

}