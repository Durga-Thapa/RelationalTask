import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './config/connect.js'

dotenv.config()
const app= express()
const port = process.env.PORT || 5000
connectDB


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})