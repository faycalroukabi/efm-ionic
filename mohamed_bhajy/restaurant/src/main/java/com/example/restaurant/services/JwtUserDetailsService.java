package com.example.restaurant.services;

import java.util.ArrayList;

import com.example.restaurant.entities.Client;
import com.example.restaurant.models.MyUserPrincipal;
import com.example.restaurant.reporsitories.IClientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private IClientRepo clientRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Client user = clientRepo.findClientByName(username);
        if (user==null){
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
       return new MyUserPrincipal(user);
    }
}