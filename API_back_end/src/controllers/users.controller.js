import { pool } from '../config/db.js'
import path from 'path'

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM users')

    const userWithImagesPaths = users.map(user => {
      if (user.imagen) {
        user.imagenPath = path.resolve(`../uploads/${user.imagen}`)
      }

      return user
    })
    res.json(userWithImagesPaths)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ocurrio un error al obtener los usuarios' })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id])

    if (users.length > 0) {
      res.json(users[0])
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ocurrio un error al obtener el usuario' })
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const profilePicture = req.file ? req.file.filename : null

    const [result] = await pool.query('INSERT INTO users (name, email, password, role, profilePicture) VALUES (?, ?, ?, ?, ?)', [name, email, password, role, profilePicture])
    res.status(201).json({ message: `Usuario creado con ID: ${result.insertId}` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ocurrio un error al crear el usuario' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, role } = req.body
    const profilePicture = req.file ? req.file.filename : null

    const [result] = await pool.query('UPDATE users SET name = IFNULL(?, name), email = IFNULL(?, email), role = IFNULL(?, role), profilePicture = IFNULL(?, profilePicture) WHERE id = ?', [name, email, role, profilePicture, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({ message: `Usuario con ID: ${id} actualizado.` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ocurrio un error al actualizar el usuario' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({ message: `Usuario con ID: ${id} eliminado` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ocurrio un error al eliminar el usuario' })
  }
}
