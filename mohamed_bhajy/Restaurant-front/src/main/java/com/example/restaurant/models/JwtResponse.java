package com.example.restaurant.models;

import java.io.Serializable;
public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private ClientDTO client;
    public JwtResponse(String jwttoken,ClientDTO client) {
        this.jwttoken = "Bearer "+jwttoken;
        this.client=client;
    }
    public String getToken() {
        return this.jwttoken;
    }

    public ClientDTO getClient() {
        return client;
    }
}