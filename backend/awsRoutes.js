const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./config.env"})

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")

let awsRoutes = express.Router()
const s3Bucket = "fullstackblogstorage"

const s3Client = new S3Client( {
    region: "us-east-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

//#1 - Retrieve One
//http://localhost:3000/posts/12345
awsRoutes.route("/images/:id").get(verifyToken, async (request, response) => {
    const id = request.params.id
    const bucketParams = {
        Bucket: s3Bucket,
        Key: id,
    }

    const data = await s3Client.send(new GetObjectCommand(bucketParams))

    const contentType = data.ContentType
    const srcString = await data.Body.transformToString('base64')
    const imageSource = `data:${contentType};base64, ${srcString}`

    response.json(imageSource)
})

//#2 - Create one
awsRoutes.route("/images").post(verifyToken, async (request, response) => {
    const file = request.files[0]
    console.log(file)
    const bucketParams = {
        Bucket: s3Bucket,
        Key: file.originalname,
        Body: file.buffer
    }
    const data = await s3Client.send(new PutObjectCommand(bucketParams))
    response.json(data)
})

function verifyToken(request, response, next) {
    const authHeaders = request.headers["authorization"]
    const token = authHeaders && authHeaders.split(' ')[1]
    console.log(request)
    if (!token) {
        return response.status(401).json({message: "Authentication token is missing"})
    }

    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if (error) {
            return response.status(403).json({message: "Invalid Token"})
        }
        next()
    })
}

module.exports = awsRoutes