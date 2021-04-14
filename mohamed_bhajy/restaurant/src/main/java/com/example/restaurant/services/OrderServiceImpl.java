package com.example.restaurant.services;


import com.example.restaurant.entities.Client;
import com.example.restaurant.entities.Order;
import com.example.restaurant.reporsitories.IClientRepo;
import com.example.restaurant.reporsitories.IOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service("OrderService")
public class OrderServiceImpl implements IOrderService {
    @Autowired
    private IOrderRepo orderRepo;
    @Autowired
    private IClientRepo clientRepo;


    @Override
    @Transactional
    public void makeOrder(Order order) {
        order.setDelivred(false);
        order.getItems().forEach(item->item.setOrder(order));
        if( order.getDefaulAdress() ==null ||order.getDefaulAdress().isEmpty() ){
            Client client = clientRepo.findClientById(order.getClient().getId());
            order.setDefaulAdress(client.getAdress());
        }
       orderRepo.save(order);
    }

    @Override
    @Transactional
    public void confirmOrder(Long id) {
        Order order =orderRepo.getOne(id);
        order.setDelivred(true);
        orderRepo.save(order);
    }


    @Override
    public List<Order> getOrdersByClient(Long id) {
        Client client = clientRepo.findClientById(id);
        return orderRepo.findByClient(client);
    }

}
