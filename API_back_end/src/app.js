import express from 'express'
import usersRoutes from './routes/users.routes.js'
/* import cors from 'cors' */

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  next()
})

app.get('/', (req, res) => {
  res.send('Bienvenido a la API CRUD')
})

app.use(usersRoutes)

app.listen(PORT, () => {
  console.log(`Servidor Corriendo en http://localhost:${PORT}`)
})
