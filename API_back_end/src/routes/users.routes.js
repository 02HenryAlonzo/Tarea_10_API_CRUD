import express from 'express'
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/users.controller.js'
import upload from '../config/multer.js'

const router = express.Router()

// Ruta para obtener todos los usuarios
router.get('/usuarios', getAllUsers)

// Ruta para obtener una usuarios especifico por ID
router.get('/usuarios/:id', getUserById)

// Ruta para crear un nuevo usuario
router.post('/usuarios', upload.single('profile-picture'), createUser)

// Ruta para actualizar un usuarios especifico por ID
router.patch('/usuarios/:id', upload.single('profile-picture'), updateUser)

// Ruta para eliminar un usuario especifico por ID
router.delete('/usuarios/:id', deleteUser)

export default router
