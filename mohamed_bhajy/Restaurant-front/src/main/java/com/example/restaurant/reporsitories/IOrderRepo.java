package com.example.restaurant.reporsitories;

import com.example.restaurant.entities.Client;
import com.example.restaurant.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderRepo extends JpaRepository<Order,Long> {
List<Order> findAll();
List<Order> findByClient(Client client);

}
