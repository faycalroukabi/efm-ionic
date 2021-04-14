package com.example.restaurant.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString @Setter @Getter
public class Client implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false ,unique = true)
    private String password;
    private String adress;
    private double longuitude;
    private double latitude;
    @Basic
    @Temporal(TemporalType.DATE)
    private java.util.Date birthday;
    private int warning;
    private String status;
    @OneToMany(mappedBy="client",cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = false)
    @JsonIgnore
    private Set<Order> orders;

    public Client(String name, String phone) {
        this.name = name;
        this.password = phone;
    }

    public Client(String name, String phone, String adress, Date birthday) {
        this.name = name;
        this.password = phone;
        this.adress = adress;
        this.birthday = birthday;
    }
}
