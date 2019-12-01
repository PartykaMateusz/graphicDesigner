package com.graphic.designer.graphicDesigner.web.Category.Controller;

import com.graphic.designer.graphicDesigner.web.Category.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> getAllCategories(){
        return new ResponseEntity<>(categoryService.getAllActive(), HttpStatus.OK);
    }

    @GetMapping("/favourite/user/{id}")
    public ResponseEntity<?> getFavouriteCategories(@PathVariable Long id,
                                                    @RequestParam(defaultValue = "5") Long limit){
        return new ResponseEntity<>(categoryService.getFavouriteByUser(id,limit),HttpStatus.OK);
    }
}
