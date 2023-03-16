import { Router } from 'express'
import { parseGoogle, parseHabr, parseYT, parseCL } from '../utils/parsers.js'
import { checkAuth } from '../utils/checkAuth.js'


const router = new Router()

// With Authentication EXAMPLE
// http://localhost:3002/api/posts
// router.post('/', checkAuth, createPost)

// Get All Google Links
// http://localhost:3002/api/parsers/google
router.post('/google', parseGoogle)

// Get data from `habr` link
// http://localhost:3002/api/parsers/google
router.post('/habr', parseHabr)

// Get data from `youtube` link
// http://localhost:3002/api/parsers/google
router.post('/youtube', parseYT)

// Get data from `cyberleninka` link
// http://localhost:3002/api/parsers/google
router.post('/cyberleninka', parseCL)

export default router