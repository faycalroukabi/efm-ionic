package com.example.restaurant.controllers;


import com.example.restaurant.entities.Product;
import com.example.restaurant.services.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private IProductService productService;

    @GetMapping("/all")
    List<Product> getAllProduct(){
        return productService.getAllProduct();
    }
   }
