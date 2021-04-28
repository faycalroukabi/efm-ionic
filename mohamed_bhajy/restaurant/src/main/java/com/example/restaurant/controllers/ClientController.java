package com.example.restaurant.controllers;


import com.example.restaurant.entities.Client;
import com.example.restaurant.entities.Order;
import com.example.restaurant.services.IClientService;
import com.example.restaurant.services.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class ClientController {
    @Autowired
    private IClientService clientService;
    @Autowired
    private IOrderService orderService;


    @PostMapping(path = "/makeOrder",consumes = MediaType.APPLICATION_JSON_VALUE)
    public void makeOrder(@RequestBody Order order){
        orderService.makeOrder(order);
    }

    @PutMapping("/confirmOrder/{id}")
    public void confirmOrder(@PathVariable("id") Long id){
        orderService.confirmOrder(id);
    }
    @GetMapping("/{id}/orders")
    public List<Order> getMyOrders(@PathVariable("id") Long id){
        return orderService.getOrdersByClient(id);
    }
     @GetMapping("/{id}")
    public Client getUser(@PathVariable("id") Long id){
        return clientService.findUser(id);
    }


    @PutMapping("/addLocation/{id}")
    public Client addLocation(@RequestBody Client client, @PathVariable("id") Long id){
        client.setId(id);
        return clientService.addLocation(client);
    }


}
