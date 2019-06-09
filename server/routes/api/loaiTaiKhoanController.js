const router = require('express').Router();
const LoaiTaiKhoanDB = require('../../models/loaitaikhoan');
//getall loại tài khoản
router.get('/', (req, res) =>{
    LoaiTaiKhoanDB.find({}, (err, data) =>{
        if(!err)
        {
            res.send(data);
        }
        else {
            return res.send({
                success: false,
                message: 'Lỗi truy vấn dữ liệu'
            });
        }
    });
});
module.exports = router;