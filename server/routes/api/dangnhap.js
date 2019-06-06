const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('connect-mongo');
const expressSession = require('express-session'); //Xử lí session bằng express
TaiKhoanDB = require('../../models/taikhoan'); // Lưu session vào mongodb

module.exports = (app) =>{
    app.post('api/dangnhap', (req, res, next) =>{
        
    })
}
