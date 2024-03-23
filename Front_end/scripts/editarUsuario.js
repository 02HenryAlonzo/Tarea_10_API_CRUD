const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const userId = urlParams.get('id')
const formEdit = document.getElementById('form-edit-user')

fetch(`http://localhost:3000/usuarios/${userId}`)
.then(res => res.json())
.then(data => {
    console.log(data);
    const { name, email,role } = data
    document.getElementById('name').value = name
    document.getElementById('email').value = email
    document.getElementById('role').value = role 
})

formEdit.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(formEdit)

    const res = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: 'PATCH',
        body: data
    })

    if (res.status === 200) {
        alert('Usuario Actualizado')
        window.location.href = '/index.html'
    } else {
        alert('Error al actualizar el usuario')
    }
})