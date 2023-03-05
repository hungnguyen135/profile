const express = require('express')
const userRouter = express.Router()

const userModel = require('../models/user')

userRouter.get('/', (req, res, next) => {
    let page = req.query.page
    let PAGE_SIZE = 1

    if (page) {
        page = page <= 0 ? parseInt(page) : 1
        let skip = (page - 1) * PAGE_SIZE
        userModel.find({})
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json('Có lỗi xảy ra')
            })
    } else {
        userModel.find({})
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json('Có lỗi xảy ra')
            })
    }
})

userRouter.get('/:id', (req, res, next) => {
    let id = req.params.id

    userModel.findById(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json('Có lỗi xảy ra')
        })
})

userRouter.post('/', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    userModel.findOne({
        username: username
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

userRouter.put('/:id', (req, res, next) => {
    let id = req.params.id
    let password = req.body.password

    userModel.findByIdAndUpdate(id, {
        password: password
    })
        .then(data => {
            res.json('Cập nhật tài khoản thành công')
        })
        .catch(err => {
            res.status(500).json('Có lỗi xảy ra')
        })
})

userRouter.delete('/:id', (req, res, next) => {
    let id = req.params.id

    userModel.deleteOne({
        _id: id
    })
        .then(data => {
            res.json('Xoá tài khoản thành công')
        })
        .catch(err => {
            res.status(500).json('Có lỗi xảy ra')
        })
})

module.exports = userRouter
