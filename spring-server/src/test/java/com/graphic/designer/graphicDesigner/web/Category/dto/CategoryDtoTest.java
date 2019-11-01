package com.graphic.designer.graphicDesigner.web.Category.dto;

import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import org.junit.Test;
import org.modelmapper.ModelMapper;

import static org.junit.Assert.assertEquals;

public class CategoryDtoTest {

    private ModelMapper modelMapper = new ModelMapper();

    @Test
    public void whenConvertCategoryEntityToCategoryDto_thenCorrect() {
        Category category = new Category();
        category.setId(1l);
        category.setActive(true);
        category.setName("categoryTest");

        CategoryDto categoryDto= modelMapper.map(category, CategoryDto.class);
        assertEquals(category.getId(), categoryDto.getId());
        assertEquals(category.getName(), categoryDto.getName());
        assertEquals(category.isActive(), categoryDto.isActive());

    }

    @Test
    public void whenConvertCategoryDtoToCategoryEntity_thenCorrect() {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(1l);
        categoryDto.setActive(true);
        categoryDto.setName("categoryTest");

        Category category = modelMapper.map(categoryDto, Category.class);

        assertEquals(category.getId(), categoryDto.getId());
        assertEquals(category.getName(), categoryDto.getName());
        assertEquals(category.isActive(), categoryDto.isActive());
    }


}