const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./config.env"})

let postRoutes = express.Router()

//#1 - Retrieve All
//http://localhost:3000/posts
postRoutes.route("/posts").get(verifyToken, async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("posts").find({}).toArray()
    if (data.length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

//#2 - Retrieve One
//http://localhost:3000/posts/12345
postRoutes.route("/posts/:id").get(verifyToken, async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("posts").findOne({_id: new ObjectId(request.params.id)})
    if (Object.keys(data).length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

//#3 - Create one
postRoutes.route("/posts").post(verifyToken, async (request, response) => {
    let db = database.getDb()
    console.log(request.body)
    let mongoObject = {
        title: request.body.title,
        description: request.body.description,
        content: request.body.content,
        author: request.body.user._id,
        dateCreated: request.body.dateCreated,
        imageId: request.body.imageId
    }
    let data = await db.collection("posts").insertOne(mongoObject)
    response.json(data)
})

//#4 - Update one
postRoutes.route("/posts/:id").put(verifyToken, async (request, response) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            author: request.body.author,
            dateCreated: request.body.dateCreated,
            imageId: request.body.imageId
        }
    }
    let data = await db.collection("posts").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})

//#5 - Delete one
postRoutes.route("/posts/:id").delete(verifyToken, async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("posts").deleteOne({_id: new ObjectId(request.params.id)})
    response.json(data)
})

function verifyToken(request, response, next) {
    const authHeaders = request.headers["authorization"]
    const token = authHeaders && authHeaders.split(' ')[1]
    if (!token) {
        return response.status(401).json({message: "Authentication token is missing"})
    }

    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if (error) {
            return response.status(403).json({message: "Invalid Token"})
        }

        request.body.user = user
        next()
    })
}

module.exports = postRoutes