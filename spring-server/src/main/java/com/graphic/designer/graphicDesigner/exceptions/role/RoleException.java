package com.graphic.designer.graphicDesigner.exceptions.role;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RoleException extends RuntimeException {
    public RoleException(String text) {
        super(text);
    }
}
