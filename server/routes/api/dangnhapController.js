const mongoose = require('mongoose');
const router = require('express').Router();
const bcrypt = require('bcrypt');
//const bodyParser = require('body-parser');
//const session = require('connect-mongo');// Lưu session vào mongodb
//const expressSession = require('express-session'); //Xử lí session bằng express
const TaiKhoan = require('../../models/taikhoan');
// const jwt = require('jsonwebtoken');
// const express = require('express');
//const app = express();
//const configToken = require('./configToken');

//địa chỉ sẽ là localhos:8080/api/dangnhap
router.post('/', (req, res) =>{
    var hashData = req.body.MatKhau;
    // bcrypt.genSalt(10, (err, salt) =>{
    //     if(err) throw err;
    //     bcrypt.hash(hashData, salt, function(err, encrypted){
    //         if(err) throw err;
    //         hashData = encrypted;
    //     });
    // });
    //Tìm một tài khoản có mật khẩu = hashData
    TaiKhoan.findOne({MatKhau: hashData}, (err, doc) =>{
        if(!err){
            TaiKhoan.findOne({TenDangNhap: req.body.TenDangNhap, MatKhau: hashData}, (err, data) =>{
                if(!err)
                {
                    return res.send({
                        success: true,
                        message: 'Đăng nhập thành công', 
                    });
                }
                else 
                {
                    return res.send({
                        success: false,
                        message: 'Lỗi, không tìm thấy tài khoản này hay truy vấn về cơ sở dữ liệu bị lỗi'
                    });  
                }
            });
        }
        else{
            res.send({
                success: false,
                message: 'Không tìm thấy mật khẩu trùng khớp'
            });
        }
    });
});

// router.post('/', (req, res) =>{
//     let username = req.body.TenDangNhap;
//     let pass = req.body.MatKhau;
//     TaiKhoan.findOne({TenDangNhap: username, MatKhau: pass}, (err, doc) =>{
//         if(!err)
//         {
//             const payload = {check: true};
//             var token = jwt.sign(payload, app.get('Secret'), {
//                 expiresIn: 1440 //có hạn đến 24 giờ.
//             });
//             res.send({
//                 success: true,
//                 message: 'Đã xác thực',
//                 token: token
//             });
//         }
//         else{
//             res.send({
//                 success: false,
//                 message: 'Không tìm thấy hoặc bị lỗi server. Kiểm tra lại những thông tin đã nhập'
//             });
//         }
//     });
// });
module.exports = router;