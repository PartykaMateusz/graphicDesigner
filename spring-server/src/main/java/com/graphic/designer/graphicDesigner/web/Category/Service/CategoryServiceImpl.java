package com.graphic.designer.graphicDesigner.web.Category.Service;

import com.graphic.designer.graphicDesigner.exceptions.category.CategoryException;
import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import com.graphic.designer.graphicDesigner.web.Category.Repository.CategoryRepository;
import com.graphic.designer.graphicDesigner.web.Category.dto.CategoryDto;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.CATEGORY_ALREADY_EXIST;
import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.CATEGORY_NOT_EXIST;

@Service
public class CategoryServiceImpl implements CategoryService {

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CategoryDto> getAll() {
       List<Category> categories = categoryRepository.findAll();

       return categories.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<CategoryDto> getAllActive() {
        List<Category> categories = categoryRepository.findAllActive();

        return categories.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryException(CATEGORY_NOT_EXIST));
    }

    @Override
    public List<CategoryDto> getFavouriteByUser(Long id, Long limit) {
        List<Category> category = categoryRepository.findFavouriteByUser(id,limit);

        return category.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public Category addCategory(CategoryDto categoryDto) {
        Category category = convertToEntity(categoryDto);
        category.setActive(true);

        if(this.categoryExist(category.getName())){
            throw new CategoryException(CATEGORY_ALREADY_EXIST);
        }
        else{
            log.info("category "+category.getName()+" has been created");
            return categoryRepository.save(category);
        }
    }

    private boolean categoryExist(String name) {
        Optional<Category> categoryOptional = categoryRepository.findByName(name);

        if(categoryOptional.isPresent()){
            return true;
        }
        else{
            return false;
        }
    }


    public CategoryDto convertToDto(Category category) {
        CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
        return categoryDto;
    }

    public Category convertToEntity(CategoryDto categoryDto) {

        Category category = modelMapper.map(categoryDto, Category.class);

        if(categoryDto.getId() != null){
            category.setId(categoryDto.getId());
        }
        return category;
    }


}
