const mongoose = require('mongoose');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('connect-mongo');// Lưu session vào mongodb
const expressSession = require('express-session'); //Xử lí session bằng express
const TaiKhoan = require('../../models/taikhoan');

// địa chỉ sẽ là localhos:8080/api/dangnhap
router.post('/', (req, res) =>{
    TaiKhoan.findOne(({TenDangNhap: req.body.TenDangNhap, MatKhau: req.body.MatKhau, BiXoa: false}), (err, data) =>{
        if(!err)
        {
            res.send({
                success: true,
                message: 'Đăng nhập thành công',
            });
            res.redirect('/');
        }
        else 
        {
            console.log('Lỗi, không tìm thấy tài khoản này');  
        }
    });
});

module.exports = router;