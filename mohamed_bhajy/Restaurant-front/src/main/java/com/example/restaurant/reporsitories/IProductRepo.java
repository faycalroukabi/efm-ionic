package com.example.restaurant.reporsitories;

import com.example.restaurant.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepo extends JpaRepository<Product,Long> {

}
