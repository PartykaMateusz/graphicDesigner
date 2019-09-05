package com.graphic.designer.graphicDesigner.errorValidator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;


@Service
public class MapValidationErrorService {

    Logger log = LoggerFactory.getLogger(this.getClass());

    public ResponseEntity<?> MapValidationService(BindingResult result){
        log.trace("map valitation service method");
        if(result.hasErrors()){
            log.info("result has errors");
            Map<String, String> errorMap = new HashMap<>();
            for(FieldError error: result.getFieldErrors()){
                errorMap.put(error.getField(),error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String,String>>(errorMap, HttpStatus.BAD_REQUEST);
        }
        return null;
    }
}
