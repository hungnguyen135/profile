const {mongoose, Schema} = require("mongoose");

const userSchema = new Schema({ //tạo khung (schemaless)
    username: String,
    password: String
}, {
    collection: 'users' //muốn lấy chính xác bảng
});

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel