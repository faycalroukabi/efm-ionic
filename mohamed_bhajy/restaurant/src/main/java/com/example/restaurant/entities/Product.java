package com.example.restaurant.entities;

import com.example.restaurant.utils.Env;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;
    private String name;
    private String image;
    private double price;
    private String description;
    public String getImage() {
        return  Env.getUrlImages()+image;
    }

}
