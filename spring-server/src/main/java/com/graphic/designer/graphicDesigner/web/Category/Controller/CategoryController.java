package com.graphic.designer.graphicDesigner.web.Category.Controller;

import com.graphic.designer.graphicDesigner.web.Category.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> getAllCategories(){

        return new ResponseEntity<>(categoryService.getAllActive(), HttpStatus.OK);
    }
}
