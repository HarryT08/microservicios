$(document).ready(function(){
    cargarUsuarios();
    $("tableUsers").DataTable();
});

async function cargarUsuarios(){
    const request = await fetch('/api/usuarios', {
        method: 'GET',
        headers: getHeaders()
    });
    const usuarios = await request.json();
    let usuarioHTML = "";
    for(let usuario of usuarios){
        usuarioHTML += `<tr>
                            <td>${usuario.id}</td>
                            <td>${usuario.nombre}</td>
                            <td>${usuario.apellido}</td>
                            <td>${usuario.username}</td>
                            <td>
                                <a href='#' onclick="eliminarUsuario(${usuario.id})" class='btn btn-danger btn-circle btn-sm'>
                                    <i class='fas fa-trash'></i>
                                </a>
                            </td>
                        </tr>`;
    }

    document.querySelector('#tableUsers tbody').outerHTML = usuarioHTML;
}

function getHeaders(){
    return {
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
}

async function eliminarUsuario(id){
    if(!confirm('¿Desea eliminar este usuario?')){
        return;
    }

    const request = await fetch('/api/usuarios/'+id,{
        method: 'DELETE',
        headers: getHeaders()
    });

    location.reload();
}