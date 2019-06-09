const router = require('express').Router();
const TaiKhoan = require('../../models/taikhoan');
const ObjectID = require('mongoose').Types.ObjectId;

//get all
router.get('/', (req, res) =>{
    TaiKhoan.find({MaLoaiTaiKhoan: 2}, (err, data) =>{
        if(!err) {
            res.send(data);
        }
        else {
            console.log('Error in Retriving TaiKhoan: ' +JSON.stringify(err, undefined, 2));
        }
    });
});

//getbyid
router.get('/:id', (req, res) =>{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send(`Không tìm thấy dữ liệu với id: ${req.params.id}`);
    }
    TaiKhoan.findById({_id: req.params.id, MaLoaiTaiKhoan: 2}, (err, data) =>{
        if(!err)
        {
            return res.send(data);
        }
        else{
            console.log('Error in Retriving TaiKhoan: ' +JSON.stringify(err, undefined, 2));
        }
    });
});

//update
router.put('/:id', (err, res) =>{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send(`Không tìm thấy dữ liệu với id: ${req.params.id}`);
    }
    var tk = new TaiKhoan({
        TenDangNhap: req.body.TenDangNhap,
        MatKhau: req.body.MatKhau,
        TenHienThi: req.body.TenHienThi,
        DiaChi: req.body.DiaChi,
        SoDienThoai: req.body.SoDienThoai,
        Email: req.body.Email,
        BiXoa: false,
    });
    TaiKhoan.findByIdAndUpdate({_id: req.params.id, MaLoaiTaiKhoan: 2}, {$set: tk}, {new: true}, (err, data) =>{
        if(!err)
        {
            return res.send(data);
        }
        else{
            console.log('Error in TaiKhoan Update: ' +JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) =>{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send(`Không tìm thấy dữ liệu với id: ${req.params.id}`);
    }
    TaiKhoan.findByIdAndDelete({_id: req.params.id, MaLoaiTaiKhoan: 2}, (err, data) =>{
        if(!err)
        {
            return res.send(data);
        }
        else{
            console.log('Error in TaiKhoan Delete: ' +JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;