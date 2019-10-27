package com.graphic.designer.graphicDesigner.exceptions.order;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class OrderException extends RuntimeException {
    public OrderException(String text) {
        super(text);
    }
}
