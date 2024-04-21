const express = require('express')
const crypto  = require('node:crypto')
const ferremas = require('./ferremas.json')
const { validateFerremas, validatePartialFerremas } = require('./schemas/ferremas')
const cors = require('cors')



const app = express()
app.use(express.json())
app.use(cors({
    origin: (origin, callback)=>{
        const ACCEPT_ORIGINS = [
            'http://localhost:8080',
            'http://localhost:1234'
        ]
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }
      
        if (!origin) {
            return callback(null, true)
        }
      
            return callback(new Error('Not allowed by CORS'))
    }
}))
app.disable ('x-powered-by')
 
app.get('/', (req, res) => {
    res.json({ message: 'hola Mundo' })
})

//Todas las categorias
app.get('/ferremas', (req, res) => {
    res.json(ferremas)
})

//Todas las categorias por ID
app.get('/ferremas/:id', (req, res) => {
    const { id } = req.params
    const ferrema = ferremas.find(ferrema => ferrema.id == id)
    if (ferrema) return res.json(ferremas)
    
    res.status(404).json({message: 'Not Found'})
})

//POST categoria
app.post('/ferremas', (req, res) => {
    
    const result = validateFerremas (req.body)
    if (result.error) {
        return res.status(422).json({ error: JSON.parse(result.error.message)})
    }


    const newFerremas = {
        id: crypto.randomUUID(),
        ... result.data
    }

    ferremas.push(newFerremas)

    res.status(201).json(newFerremas)
})

//PATCH categoria
app.patch('/ferremas/:id', (req, res) =>{

    const result = validatePartialFerremas(req.body)
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }

    const { id } = req.params
    const ferremasIndex = ferremas.findIndex(ferrema => ferrema.id == id)

    if (!ferremasIndex == -1 ) {
        return res.status(404).json({ message: "Ferrema no encontrada"})
    }

    const updateFerremas = {
        ...ferremas[ferremasIndex],
        ...result.data
    }

    ferremas[ferremasIndex]= updateFerremas

    return res.json(updateFerremas)
})


//DELETE v
app.delete('/ferremas/:id', (req, res) => {
    const ferremasIndex= ferremas.findIndex(ferrema => ferrema == id)
    if (ferremasIndex == -1) {
        return res.status(404).json({ message: 'Ferremas not found '})
    } 

    ferremas.splice(ferremasIndex, 1)
    
    return res.json({ message: 'ferrema eliminado'})
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () =>{
    console.log (`Server en puerto http://localhost:${PORT}`)
})