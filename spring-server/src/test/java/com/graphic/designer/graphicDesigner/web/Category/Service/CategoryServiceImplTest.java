package com.graphic.designer.graphicDesigner.web.Category.Service;

import com.graphic.designer.graphicDesigner.exceptions.category.CategoryException;
import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import com.graphic.designer.graphicDesigner.web.Category.Repository.CategoryRepository;
import com.graphic.designer.graphicDesigner.web.Category.dto.CategoryDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.CATEGORY_NOT_EXIST;
import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CategoryServiceImplTest {

    @Autowired
    private CategoryService categoryService;

    @MockBean
    private CategoryRepository categoryRepository;

    @Test
    public void getAll() {
        List<Category> categories = this.generateSampleCategoryList();

        when(categoryRepository.findAll()).thenReturn(categories);

        List<CategoryDto> returned = categoryService.getAll();
        assertEquals(returned.size(),categories.size());
    }



    @Test
    public void getAllActive() {
        List<Category> categories = this.generateSampleCategoryList();

        List<Category> onlyActiveCategories = categories.stream().filter(c -> c.isActive()).collect(Collectors.toList());

        when(categoryRepository.findAllActive()).thenReturn(onlyActiveCategories);

        List<CategoryDto> returned = categoryService.getAllActive();
        assertEquals(returned.size(),onlyActiveCategories.size());
    }

    @Test
    public void findById() {
        Category category = this.generateCategory();

        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));

        assertEquals(categoryService.findById(category.getId()).getName(),category.getName());
    }

    @Test
    public void findByIdWhenCategoryNotFound() {
        Category category = this.generateCategory();

        when(categoryRepository.findById(category.getId())).thenReturn(Optional.empty());

        assertThrows(CategoryException.class,() -> categoryService.findById(100L) );
    }

    private Category generateCategory() {
        Category category = new Category();
        category.setName("test");
        category.setId(1L);
        category.setActive(true);

        return category;
    }

    private List<Category> generateSampleCategoryList() {
        List<Category> categories = new ArrayList<>();

        for(Long i=0L ; i<10 ; i++){
            Category category = new Category();
            category.setName("test "+i);
            category.setId(i);

            if ((i % 2 == 0)) {
                category.setActive(true);
            } else {
                category.setActive(false);
            }

            categories.add(category);
        }

        return categories;
    }
}