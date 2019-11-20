package com.graphic.designer.graphicDesigner.exceptions.rate;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RateException extends RuntimeException {
    public RateException(String text) {
        super(text);
    }
}
