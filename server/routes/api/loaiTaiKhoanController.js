const router = require('express').Router();
const LoaiTaiKhoanDB = require('../../models/loaitaikhoan');
//getall loại tài khoản
router.get('/loaitaikhoan', (req, res) =>{
    LoaiTaiKhoanDB.find({}, (err, data) =>{
        if(!err) throw err;
        res.send(data);
    });
});