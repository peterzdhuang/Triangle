package com.peter.triangle.controller;

import com.peter.triangle.model.Food;
import com.peter.triangle.model.Menu;
import com.peter.triangle.repository.FoodRepository;
import com.peter.triangle.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private FoodRepository foodRepository;

    // Add a food item to a menu
    @PostMapping("api/{menuId}/foods")
    public ResponseEntity<Food> addFoodToMenu(@PathVariable UUID menuId, @RequestBody Food food) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found for ID: " + menuId));

        Food savedFood = foodRepository.save(food);
        menu.getFoods().add(food);
        menuRepository.save(menu);
        return ResponseEntity.ok(savedFood);
    }

    // Retrieve all food items in a menu
    @GetMapping("/{menuId}/foods")
    public ResponseEntity<List<Food>> getFoodsInMenu(@PathVariable UUID menuId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found for ID: " + menuId));
        return ResponseEntity.ok(menu.getFoods());
    }

    // Update a food item in a menu
    @PutMapping("/{menuId}/foods/{foodId}")
    public ResponseEntity<Food> updateFoodInMenu(@PathVariable UUID menuId, @PathVariable UUID foodId, @RequestBody Food updatedFood) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found for ID: " + menuId));

        Food existingFood = foodRepository.findById(foodId)
                .orElseThrow(() -> new IllegalArgumentException("Food not found for ID: " + foodId));

        // Update fields
        existingFood.setName(updatedFood.getName());
        existingFood.setDescription(updatedFood.getDescription());
        existingFood.setPrice(updatedFood.getPrice());
        existingFood.setCategory(updatedFood.getCategory());

        Food savedFood = foodRepository.save(existingFood);

        return ResponseEntity.ok(savedFood);
    }

    // Delete a food item from a menu
    @DeleteMapping("/{menuId}/foods/{foodId}")
    public ResponseEntity<Void> deleteFoodFromMenu(@PathVariable UUID menuId, @PathVariable UUID foodId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found for ID: " + menuId));

        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new IllegalArgumentException("Food not found for ID: " + foodId));

        menu.getFoods().remove(food);
        foodRepository.delete(food);
        menuRepository.save(menu);
        return ResponseEntity.noContent().build();
    }
}
