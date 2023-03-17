package com.ufps.userProfile.controllers;

import com.ufps.userProfile.entity.Usuario;
import com.ufps.userProfile.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public void registrarUsuario(@RequestBody Usuario usuario){
        usuarioService.registrar(usuario);
    }
}
