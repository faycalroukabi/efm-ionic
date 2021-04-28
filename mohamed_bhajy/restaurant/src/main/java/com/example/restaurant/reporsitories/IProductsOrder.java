package com.example.restaurant.reporsitories;


import com.example.restaurant.entities.ProductsOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductsOrder extends JpaRepository<ProductsOrder,Long> {

}
