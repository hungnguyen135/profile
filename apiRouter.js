const express = require('express')
const apiRouter = express.Router()
const userModel = require('./models/user')
const userRouter = require('./routers/user')
const path = require('path')

apiRouter.get('/', (req, res) => {
    let pathUrl = path.join(__dirname, 'index.html')
    res.sendFile(pathUrl)
})

apiRouter.post('/register', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    userModel.findOne({
        username : username
    })
        .then(data => {
            if (data) {
                res.json('Username đã tồn tại')
            } else {
                return userModel.create({
                    username: username,
                    password: password
                })
            }
        })
        .then(data => {
            res.json('Tạo tài khoản thành công')
        })
        .catch(err => {
            res.status(500).json('Có lỗi xảy ra')
        })
})

apiRouter.post('/login', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    userModel.findOne({
        username: username,
        password: password
    })
        .then(data => {
            if (data) {
                res.json('Đăng nhập thành công')
            } else {
                res.status(400).json('Tài khoản hoặc mật khẩu không đúng')
            }
        })
        .catch(err => {
            res.status(500).json('Có lỗi xảy ra')
        })
})

apiRouter.use('/api/v1/user', userRouter)

// //middleware
// app.get('/', (req, res, next) => {
//     console.log('md1')
//     next()
// }, (req, res, next) => {
//     console.log('md2')
//     next()
// }, (req, res, next) => {
//     console.log('md3')
//     next()
// })
//
// app.use((req, res, next) => { //cửa chung
//     console.log('md4')
// })

// var checkAdmin = (red, res, next) => {
//     if (isAdmin) {
//          res.json('ok')
//          next()
//     } else {
//          res.json('failed')
//     }
// }
// app.get('/', checkAdmin, (req, res, next) => {
//     app.json('dữ liệu')
// })

// router 4 tham số => để xử lý lỗi
// app.get('/', checkAdmin, (req, res, next) => {
//     next("")
// })
// app.use((data, req, res, next) => {
//     xử lý lỗi
// })

// apiRouter.get('/:id', (req, res) => { thường để sau cùng
//     res.json('Home Page')
// })

module.exports = apiRouter