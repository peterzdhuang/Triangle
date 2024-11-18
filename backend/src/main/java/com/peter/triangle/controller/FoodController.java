package com.peter.triangle.controller;

import com.peter.triangle.model.Food;
import com.peter.triangle.model.Menu;
import com.peter.triangle.repository.FoodRepository;
import com.peter.triangle.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private MenuRepository menuRepository;

    // Create a new food item
    @PostMapping
    public ResponseEntity<Food> createFood(@RequestParam UUID menuId, @RequestBody Food food) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found for ID: " + menuId));

        Food savedFood = foodRepository.save(food);
        return ResponseEntity.ok(savedFood);
    }

    // Retrieve all food items for a specific menu
    @GetMapping
    public ResponseEntity<List<Food>> getFoodsByMenu(@RequestParam UUID menuId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found for ID: " + menuId));

        List<Food> foods = menu.getFoods();
        return ResponseEntity.ok(foods);
    }

    // Update a food item by ID
    @PutMapping("/{foodId}")
    public ResponseEntity<Food> updateFood(@PathVariable UUID foodId, @RequestBody Food updatedFood) {
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

    // Delete a food item by ID
    @DeleteMapping("/{foodId}")
    public ResponseEntity<Void> deleteFood(@PathVariable UUID foodId) {
        Food existingFood = foodRepository.findById(foodId)
                .orElseThrow(() -> new IllegalArgumentException("Food not found for ID: " + foodId));

        foodRepository.delete(existingFood);
        return ResponseEntity.noContent().build();
    }
}
