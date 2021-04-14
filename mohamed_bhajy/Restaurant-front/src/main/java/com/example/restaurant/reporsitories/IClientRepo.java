package com.example.restaurant.reporsitories;


import com.example.restaurant.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IClientRepo extends JpaRepository<Client,Long> {
//    boolean existsClientByPhone(String phone);
    Client findClientById(Long id);
    Client findClientByName(String name);
    
}
