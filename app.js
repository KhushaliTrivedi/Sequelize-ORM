const express = require('express')
const app = express()
app.use(express.json())

const { sequelize, user, Post } = require('./models');

app.post('/users', async(req,res) => {
    const {name,email,role} = req.body

    try{
        const users = await user.create({name,email,role})
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/users', async(req,res) => {
    try{
        const users = await user.findAll()

        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/users/:uuid', async(req,res) => {
    const uuid = req.params.uuid
    try{
        const users = await user.findOne({
            where: {uuid},
            include: 'posts'
        })

        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})


app.put('/users/:uuid', async(req,res) => {
    const uuid = req.params.uuid
    const { name, email, role } = req.body
    try{
        const users = await user.findOne({where: {uuid}})

        users.name = name
        users.email = email
        users.role = role

        await users.save()

        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.delete('/users/:uuid', async(req,res) => {
    const uuid = req.params.uuid
    try{
        const users = await user.findOne({where: {uuid}})

        await users.destroy()
        return res.json({message: 'User Deleted!'})
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.post('/posts', async(req,res) => {
    const {userUuid,body} = req.body

    try{
        const users = await user.findOne({where: {uuid: userUuid}})

        const post = await Post.create({body, userId: users.id})
        return res.json(post)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/posts', async(req,res) => {
    try{
        const posts = await Post.findAll({include: [user]})

        return res.json(posts)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.listen(5000, async() => {
    console.log("SERVER IS RUNNING")
    await sequelize.authenticate();
    console.log("DB CONNECTED")
})
    
