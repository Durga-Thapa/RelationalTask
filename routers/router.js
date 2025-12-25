import express from 'express'
import { createUser, getUsers } from '../controller/userController'

const router=express.Router()
router.post('/user', uploadProfileImage, createUser)
router.get('/users', getUsers)