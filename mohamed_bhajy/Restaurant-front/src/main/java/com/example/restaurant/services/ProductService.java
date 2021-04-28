package com.example.restaurant.services;

import com.example.restaurant.entities.Product;
import com.example.restaurant.reporsitories.IProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepo productRepo;
    @Override
    public List<Product> getAllProduct() {

        return productRepo.findAll();
    }

}
