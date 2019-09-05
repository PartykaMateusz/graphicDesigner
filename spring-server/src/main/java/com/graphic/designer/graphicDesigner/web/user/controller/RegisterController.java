package com.graphic.designer.graphicDesigner.web.user.controller;

import com.graphic.designer.graphicDesigner.errorValidator.MapValidationErrorService;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class RegisterController {

    @Autowired
    private UserService userService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping("/register/user")
    public ResponseEntity<?> register(@RequestBody @Valid UserDto accountDto,
                                      BindingResult result){

        log.trace("register user endpoint");
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        return new ResponseEntity<>(this.userService.registerNewUserAccount(accountDto), HttpStatus.CREATED);
    }


}
