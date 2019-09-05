package com.graphic.designer.graphicDesigner.web.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmailIsUsed extends RuntimeException {

    public EmailIsUsed(String text) {
        super(text);
    }
}
