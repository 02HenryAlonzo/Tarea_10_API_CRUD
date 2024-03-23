document.getElementById('usuarios-tbody').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete')) {
        const userId = e.target.getAttribute('data-id');
        eliminarUsuario(userId);
    }
});

function eliminarUsuario(id) {
    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert('El usuarios a sido eliminado con exito')
            cargarYMostrarUsuarios();
        } else {
            alert('No se pudo eliminar el usuario.');
        }
    })
    .catch(error => {
        console.error('Error al eliminar el usuario:', error);
    });
}
