package com.ufps.userProfile.service;

import com.ufps.userProfile.entity.Usuario;

import java.util.List;

public interface UsuarioService {

    List<Usuario> getUsuarios();

    void eliminar(long id);

    void registrar(Usuario usuario);
}
