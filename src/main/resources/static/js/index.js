$(document).ready(function(){
    cargarUsuarios();
    $("tableUsers").DataTable();
});

//PETICIONES
function saveUser(user){
    return fetch('./api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

function putUser(user){
    return fetch('./api/usuarios', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

async function eliminarUsuario(id){
    Swal.fire({
        title: 'Esta seguro?',
        text: 'Al borrar el usuario, este no podrá ser recuperado!',
        icon: 'warning'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const request = await fetch(`/api/usuarios/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
            });
            Swal.fire({
                title: 'Operación exitosa',
                text: 'Usuario borrado con éxito!',
                icon: 'success'
            }).then(async (result) => {
                location.reload();
            })
        }
    })
}

async function cargarUsuarios(){
    const request = await fetch('/api/usuarios', {
        method: 'GET',
        headers: getHeaders()
    });
    const usuarios = await request.json();
    let usuarioHTML = "";
    for(let usuario of usuarios){
        usuarioHTML += `<tr>
                            <td class="text-center">${usuario.id}</td>
                            <td>${usuario.nombre}</td>
                            <td>${usuario.apellido}</td>
                            <td>${usuario.username}</td>
                            <td class="text-center">
                                <button type="button" class="btn btn-outline-secondary" onclick="getUserGithub('${usuario.username}')">
                                    Ver Github
                                </button>
                            </td>
                            <td class="text-center">
                                <a href='#' onclick="getUsuario(${usuario.id})" class='btn btn-warning btn-circle btn-sm' data-bs-toggle="modal" data-bs-target="#modalUpdateUsuario">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </a>
                                <a href='#' onclick="eliminarUsuario(${usuario.id})" class='btn btn-danger btn-circle btn-sm'>
                                    <i class="fa-regular fa-trash-can"></i>
                                </a>
                            </td>
                        </tr>`;
    }

    document.querySelector('#tableUsers tbody').outerHTML = usuarioHTML;
}

async function createUser() {
    if (!validateUser('Act')) {
        return;
    }

    const user = armarJsonUser('Act');
    try {
        const response = await saveUser(user);
        if(response.status === 201){
            return Swal.fire({
                title: 'Confirmación',
                text: 'Usuario creado con éxito',
                icon: 'success'
            }).then((result) => {
                location.reload();
            })
        }

        return Swal.fire('Atención', 'Hubo un error en el servidor', 'error')
    } catch (e) {
        Swal.fire('Atención', 'No se pudo guardar el usuario debido a un error en el servidor.', 'error');
    }
}

async function getUsuario(id){
    const request = await fetch(`/api/usuarios/${id}`, {
        method: 'GET',
        headers: getHeaders()
    });

    const usuario = await request.json();
    document.querySelector('#idAbd').value = usuario.id;
    document.querySelector('#nameAbd').value = usuario.nombre;
    document.querySelector('#lastnameAbd').value = usuario.apellido;
    document.querySelector('#usernameAbd').value = usuario.username;
}

async function updateUser(){
    if(!validateUser('Abd'))
        return;

    const user = armarJsonUser('Abd');
    try {
        const response = await putUser(user);
        if(response.status === 201){
            return Swal.fire({
                title: 'Confirmación',
                text: 'Usuario actualizado con éxito',
                icon: 'success'
            }).then((result) => {
                location.reload();
            })
        }

        return Swal.fire('Atención', 'Hubo un error en el servidor', 'error')
    } catch (e) {
        Swal.fire('Atención', 'No se pudo actualizar el usuario debido a un error en el servidor.', 'error');
    }
}

async function getUserGithub(username){
    await fetch(`https://api.github.com/users/${username}`)
        .then(result => result.json())
        .then(data => {

            if(data.message === "Not Found"){
                Swal.fire({
                    title: 'Error!',
                    text: 'Parece que este usuario no existe',
                    icon: 'error'
                })
                return;
            }

            $('#modalGithub').modal('show');
            $('#imgGit').attr('src', data.avatar_url);
            $('#usernameGit').val(data.login);
            $('#followersGit').val(data.followers);
            $('#followingGit').val(data.following);
        }).catch(error => {
            console.log("Ha ocurrido un error " + error);
            Swal.fire({
                title: 'Error!',
                text: 'Ha ocurrido un error en el servidor!',
                icon: 'error'
            })
        })
}

//VALIDACIONES DE CAMPOS
function validateUser(prefijo){
    let nombre = document.querySelector('#name'+prefijo).value;
    let apellido = document.querySelector('#lastname'+prefijo).value;
    let username = document.querySelector('#username'+prefijo).value;
    let msg = '';

    if(esVacio(nombre)){
        msg = 'Debe ingresar el nombre';
    }else if(esVacio(apellido)){
        msg = 'Debe ingresar el apellido';
    }else if(esVacio(username)){
        msg = 'Debe ingresar el username';
    }
    
    if(!esVacio(msg)){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast.fire({
            icon: 'error',
            title: 'Error',
            text: msg
        })
        return false;
    }

    return true;
}

//ARMADO DE JSON
function armarJsonUser(prefijo){
    let id = "";
    if(document.querySelector('#id'+prefijo)){
        id = document.querySelector('#id'+prefijo).value;
    }
    const user = {
        id: id,
        nombre: document.querySelector('#name'+prefijo).value,
        apellido: document.querySelector('#lastname'+prefijo).value,
        username: document.querySelector('#username'+prefijo).value
    };
    return user;
}

//UTILES
function esVacio(vlor){
    var valor = vlor;
    if (valor === undefined || valor === null || valor === '') {
        return true;
    }
    for (var i = 0; i < valor.toString().length; i++) {
        if ((valor.toString().charAt(i) != ' ') && (valor.toString().charAt(i) != "\t") &&
            (valor.toString().charAt(i) != "\n") &&
            (valor.toString().charAt(i) != "\r")) {
            return false;
        }
    }
    return true;
}

function getHeaders(){
    return {
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
}