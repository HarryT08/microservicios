package com.ufps.userProfile.service;

import com.ufps.userProfile.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    List<Usuario> getUsuarios();

    void eliminar(long id);

    void crear(Usuario usuario);

    Optional<Usuario> getUsuario(long id);

    void update(Usuario usuario);
}
