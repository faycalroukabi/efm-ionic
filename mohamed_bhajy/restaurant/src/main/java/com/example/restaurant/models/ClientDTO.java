package com.example.restaurant.models;


import com.example.restaurant.entities.Client;
import lombok.Data;

@Data
public class ClientDTO {
    private Long id;
    private String name;
    private String adress;
    private double longuitude;
    private double latitude;
    private java.util.Date birthday;
    private int warning;
    private String status;

    public ClientDTO(Client client){
        this.id=client.getId();
        this.name=client.getName();
        this.adress=client.getAdress();
        this.birthday=client.getBirthday();
    }
}
