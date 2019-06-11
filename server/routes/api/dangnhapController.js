const router = require('express').Router();
const bcrypt = require('bcrypt');
const TaiKhoan = require('../../models/taikhoan');
//const jwt = require('jsonwebtoken');
//const configToken = require('./configToken');
//địa chỉ sẽ là localhos:8080/api/dangnhap
router.post('/', (req, res) => {
    TaiKhoan.findOne({TenDangNhap: req.body.TenDangNhap}, (err, user) => {
        if (!err) {
            if (user === null) {
                res.end("Thông tin đăng nhập không đúng");
            } else if (user.TenDangNhap === req.body.TenDangNhap && bcrypt.compare(req.body.MatKhau, user.MatKhau)===true) {
                // const token = jwt.sign({
                //     TenDangNhap: user.TenDangNhap,
                //     MatKhau: user.MatKhau
                // }, process.env.JWT_KEY({
                //     expiresIn: '24h' // hiệu lực 24h
                // }));
                res.send({
                    success: true,
                    message: 'Đăng nhập thành công',
                    // token: token
                });
            } else {
                res.end('Thông tin đăng nhập không đúng, kiểm tra lại');
            }
        } else {
            res.send({
                success: false,
                message: 'Lỗi truy vấn dữ liệu từ server'
            });
        }
    });
});
module.exports = router;