package com.ufps.userProfile.controllers;

import com.ufps.userProfile.entity.Usuario;
import com.ufps.userProfile.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService){ this.usuarioService = usuarioService;}

    @DeleteMapping(value = "/{id}")
    public void eliminar(@PathVariable Long id){
        usuarioService.eliminar(id);
    }

    @GetMapping
    public List<Usuario> getUsuarios(){
        return usuarioService.getUsuarios();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable Long id){
        Optional<Usuario> user = usuarioService.getUsuario(id);
        if(user.isPresent()) {
            Usuario userReturn = user.get();
            return new ResponseEntity<>(userReturn, HttpStatus.FOUND);
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario){
        try{
            usuarioService.crear(usuario);
            return new ResponseEntity<>(usuario, HttpStatus.CREATED);
        }catch(Exception e){
            System.out.println("Error al guardar el usuario " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<Usuario> updateUser(@RequestBody Usuario usuario){
        try{
            usuarioService.update(usuario);
            return new ResponseEntity<>(usuario, HttpStatus.CREATED);
        }catch (Exception e){
            System.out.println("Error al actualizar el usuario " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
