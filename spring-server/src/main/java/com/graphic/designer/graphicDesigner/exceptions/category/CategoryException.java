package com.graphic.designer.graphicDesigner.exceptions.category;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CategoryException extends RuntimeException {
    public CategoryException(String text) {
        super(text);
    }
}
