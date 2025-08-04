import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import path from 'path'
import votesRoutes from './modules/votes/routes.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use (bodyParser.urlencoded({ extended : true}))

// Utiliser les routes des votes
app.use('/votes', votesRoutes)

app.get('/', (req, res) => {
    res.send(path.join(path.resolve(), '../frontend/index.html'))
})

app.listen(PORT, () =>{
    console.log (`Server lancé sur http://localhost:${PORT}`)
})