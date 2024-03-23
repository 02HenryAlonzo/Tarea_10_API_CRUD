const formUser = document.getElementById('create-user-form')

formUser.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = new FormData(formUser)

    const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        body: data,
    })

    if (res.status === 201) {
        alert('Usuario Creado correctamente')
        window.location.href = '/index.html'
    } else {
        alert('Error al crear usuario')
    }
})