package com.example.restaurant.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="orders")
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class Order implements Serializable {
    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String defaulAdress;
    private double longuitude;
    private double latitude;
    private boolean delivred;
    @OneToMany(mappedBy="order",cascade = CascadeType.ALL,fetch = FetchType.EAGER,
            orphanRemoval = true)
    @JsonBackReference
    private List<ProductsOrder> items;
    @ManyToOne
    @JoinColumn(name="client_id")
    private Client client;
//    @ManyToOne
//    @JoinColumn(name="courier_id")
//    private Courier courier;

}