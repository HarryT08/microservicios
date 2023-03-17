package com.ufps.userProfile.service.Implement;

import com.ufps.userProfile.entity.Usuario;
import com.ufps.userProfile.repository.UsuarioRepository;
import com.ufps.userProfile.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImp implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioServiceImp(UsuarioRepository usuarioRepository){ this.usuarioRepository = usuarioRepository; }

    @Override
    public List<Usuario> getUsuarios() {
        List<Usuario> users = usuarioRepository.findAll();
        return users;
    }

    @Override
    public void eliminar(long id) {
        Optional<Usuario> optional = usuarioRepository.findById(id);
        if(optional.isPresent()){
            usuarioRepository.delete(optional.get());
        }
    }

    @Override
    public void registrar(Usuario usuario) {
        usuarioRepository.save(usuario);
    }
}
