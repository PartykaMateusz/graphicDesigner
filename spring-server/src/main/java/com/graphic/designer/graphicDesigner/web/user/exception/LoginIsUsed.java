package com.graphic.designer.graphicDesigner.web.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class LoginIsUsed extends RuntimeException {
    public LoginIsUsed(String text) {
        super(text);
    }
}
