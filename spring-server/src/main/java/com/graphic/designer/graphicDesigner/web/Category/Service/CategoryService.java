package com.graphic.designer.graphicDesigner.web.Category.Service;

import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import com.graphic.designer.graphicDesigner.web.Category.dto.CategoryDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {

    List<CategoryDto> getAll();

    List<CategoryDto> getAllActive();

    Category findById(Long id);
}
