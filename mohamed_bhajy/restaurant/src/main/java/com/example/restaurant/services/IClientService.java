package com.example.restaurant.services;


import com.example.restaurant.entities.Client;

public interface IClientService {
    public Client addClient(Client client);
public Client findUser(Long id);
Client addLocation(Client client);
}
