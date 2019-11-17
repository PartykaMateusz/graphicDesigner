package com.graphic.designer.graphicDesigner.exceptions.job;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class JobException extends RuntimeException {
    public JobException(String text) {
        super(text);
    }
}
