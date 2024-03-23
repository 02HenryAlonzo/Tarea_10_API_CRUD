function cargarYMostrarUsuarios() {
  fetch("http://localhost:3000/usuarios")
    .then((response) => response.json())
    .then((usuarios) => {
      const tbody = document.getElementById("usuarios-tbody");
      tbody.innerHTML = ""; // Limpiar el cuerpo de la tabla antes de añadir nuevos usuarios

      usuarios.forEach((usuario) => {
        const tr = document.createElement("tr"); // Crear una nueva fila para el usuario
        const imagePath = usuario.profilePicture ? `http://localhost:3000/uploads/${usuario.profilePicture}` : 'https://via.placeholder.com/50'
        tr.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.name}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.role}</td>
                    <td><img src="${imagePath}" alt="Profile Picture" style="width: 50px; height: 50px;"></td>
                    <td>
                        <a class="edit" href=".//Html/editarUsuario.html?id=${usuario.id}">Edit</a>
                        <button class="delete" data-id="${usuario.id}">Delete</button>
                    </td>
                `;
        tbody.appendChild(tr); // Añadir la fila al cuerpo de la tabla
      });
    })
    .catch((error) => console.error("Error al cargar los usuarios:", error));
}

// Llamar a cargarYMostrarUsuarios() para cargar los usuarios cuando la página esté lista
document.addEventListener("DOMContentLoaded", cargarYMostrarUsuarios);
