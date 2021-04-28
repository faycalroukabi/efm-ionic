package com.example.restaurant.services;


import com.example.restaurant.entities.Client;
import com.example.restaurant.reporsitories.IClientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("ClientService")
public class ClientServiceImpl implements IClientService {

    @Autowired
    private IClientRepo clientRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Client addClient(Client client) {
          client.setPassword(passwordEncoder.encode(client.getPassword()));
          return clientRepo.save(client);

    }

    @Override
    public Client addLocation(Client client) {
        Client client1 =findUser(client.getId());
        client1.setAdress(client.getAdress());
        client1.setLatitude(client.getLatitude());
        client1.setLonguitude(client.getLonguitude());
       return clientRepo.save(client1);

    }

    @Override
    public Client findUser(Long id) {
        return clientRepo.findClientById(id);
    }
}
