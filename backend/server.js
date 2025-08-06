import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import path from 'path'

import limiter from './middlewares/limiter.js'

import votesRoutes from './modules/votes/routes.js'
import commentsRoutes from './modules/comments/routes.js'
import ideasRoutes from './modules/ideas/routes.js';
import usersRoutes from './modules/users/routes.js';
import categoriesRoutes from './modules/categories/routes.js';


const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())


app.use('/api/users', limiter, usersRoutes);

app.use('/api/comments/getComments', commentsRoutes)
app.use('api/comments/postComments', limiter, commentsRoutes)

app.use('/api/ideas/getIdeas', ideasRoutes);
app.use('/api/ideas/getIdea', ideasRoutes);
app.use('/api/ideas/postIdea', limiter, ideasRoutes);

app.use('/api/categories/getCategories', categoriesRoutes);
app.use('/api/categories/postCategories', limiter, categoriesRoutes);


app.use('/api/votes', votesRoutes)



app.use (bodyParser.urlencoded({ extended : true}))

app.get('/', (req, res) => {
    res.send(path.join(path.resolve(), '../frontend/index.html'))
})

app.listen(PORT, () =>{
    console.log (`Server lancé sur http://localhost:${PORT}`)
})