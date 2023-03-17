package com.ufps.userProfile.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@ToString
@Table(name = "users")
public class Usuario implements Serializable {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "id")
    private Long id;

     @Column(name = "name")
    private String nombre;

     @Column(name = "last_name")
    private String apellido;

     @Column
    private String username;
}
