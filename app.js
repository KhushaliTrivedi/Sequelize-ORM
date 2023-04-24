const express = require('express')
const app = express()
app.use(express.json())

const { sequelize, user, Post } = require('./models');

app.post('/users', async(req,res) => {

    // TRANSACTION HELPS TO AVOIDE ATOMICITY IN DATABASE
    let transaction;
    const {name,email,role} = req.body
    try{
        transaction = await sequelize.transaction();
        const users = await user.create({name,email,role},{ transaction })

        console.log("SUCCESS")
        // IF THIS QUERY WILL RUN SUCCESSFULLY WITHOUT ANY ERROR THEN IT WILL COMMIT THIS TRANSACTION
        await transaction.commit();
        return res.json(users)
    }catch(err){
        console.log("ERROR",err)
        // ELSE IT WILL ROLLBACK THE TRANSACTION TO THE STATE WHEN IT WAS BEFORE THE ERROR HAPPENED
        await transaction.rollback();
        return res.status(500).json(err)
    }
})

app.get('/users', async(req,res) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();
        const users = await user.findAll({ transaction })

        await transaction.commit();
        return res.json(users)
    }catch(err){
        console.log(err)

        await transaction.rollback();
        return res.status(500).json(err)
    }
})

app.get('/users/:uuid', async(req,res) => {
    let transaction;
    const uuid = req.params.uuid
    try{
        transaction = await sequelize.transaction();
        const users = await user.findOne({
            where: {uuid},
            include: 'posts'
        },{ transaction })

        await transaction.commit();
        return res.json(users)
    }catch(err){
        console.log(err)
        await transaction.rollback();
        return res.status(500).json(err)
    }
})


app.put('/users/:uuid', async(req,res) => {
    let transaction;
    const uuid = req.params.uuid
    const { name, email, role } = req.body
    try{
        transaction = await sequelize.transaction();
        const users = await user.findOne({where: {uuid}},{ transaction })

        users.name = name
        users.email = email
        users.role = role

        await users.save()

        await transaction.commit();
        return res.json(users)
    }catch(err){
        console.log(err)
        await transaction.rollback();
        return res.status(500).json(err)
    }
})

app.delete('/users/:uuid', async(req,res) => {
    let transaction;
    const uuid = req.params.uuid
    try{
        transaction = await sequelize.transaction();
        const users = await user.findOne({where: {uuid}},{ transaction })

        await users.destroy()
        await transaction.commit();
        return res.json({message: 'User Deleted!'})
    }catch(err){
        console.log(err)
        await transaction.rollback();
        return res.status(500).json(err)
    }
})

app.post('/posts', async(req,res) => {
    let transaction;
    const {userUuid,body} = req.body

    try{
        transaction = await sequelize.transaction();
        const users = await user.findOne({where: {uuid: userUuid}},{ transaction })

        const post = await Post.create({body, userId: users.id},{ transaction })

        await transaction.commit();
        return res.json(post)
    }catch(err){
        console.log(err)
        await transaction.rollback();
        return res.status(500).json(err)
    }
})

app.get('/posts', async(req,res) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();
        const posts = await Post.findAll({include: [user]},{ transaction })

        await transaction.commit();
        return res.json(posts)
    }catch(err){
        console.log(err)
        await transaction.rollback();
        return res.status(500).json(err)
    }
})

app.listen(5000, async() => {
    console.log("SERVER IS RUNNING")
    await sequelize.authenticate();
    console.log("DB CONNECTED")
})
    
