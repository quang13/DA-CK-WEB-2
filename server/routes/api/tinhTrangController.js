const router = require('express').Router();
const TinhTrangDB = require('../../models/tinhtrang');
router.get('/', (req, res) =>{
    TinhTrangDB.find({}, (err, data) =>{
        if(!err)
        {
            return res.send(data);
        }
        else {
            return res.send({
                success: false,
                message: 'Lỗi truy vấn dữ liệu'
            });
        }
    });
});