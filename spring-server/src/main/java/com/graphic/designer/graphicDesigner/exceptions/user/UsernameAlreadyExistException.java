package com.graphic.designer.graphicDesigner.exceptions.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameAlreadyExistException extends RuntimeException {
    public UsernameAlreadyExistException(String text) {
        super(text);
    }
}
