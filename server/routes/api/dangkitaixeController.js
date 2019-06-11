const router = require('express').Router();
const TaiKhoan = require('../../models/taikhoan');
const bcrypt = require('bcrypt');
router.post('/', (req, res) =>{
    TaiKhoan.findOne({TenDangNhap: req.body.TenDangNhap}, (err, data) =>{
        if(!err) 
        {
            if(data.length > 0)
            {
                return res.send({
                    success: false, // nếu không lỗi tức là có dữ liệu thì tên đăng nhập này đã được sử dụng thì success=false
                    message: 'Tên đăng nhập đã được sử dụng, vui lòng dùng tên khác.'
                }); 
            } 
        }
        else {
            return res.send({
                success: false,
                message: 'Lỗi truy vấn dữ liệu!'
            });
        }
    });
    TaiKhoan.findOne({Email: req.body.Email}, (err, data) =>{
        if(!err) 
        {
            if(data.length > 0)
            {
                return res.send({
                    success: false, // nếu không lỗi tức là có dữ liệu thì tên đăng nhập này đã được sử dụng thì success=false
                    message: 'Email đã được sử dụng, vui lòng dùng email khác.'
                }); 
            } 
        }
        else {
            return res.send({
                success: false,
                message: 'Lỗi truy vấn dữ liệu!'
            });
        }
    });
    TaiKhoan.findOne({SoDienThoai: req.body.SoDienThoai}, (err, data) =>{
        if(!err) 
        {
            if(data.length > 0)
            {
                return res.send({
                    success: false, // nếu không lỗi tức là có dữ liệu thì tên đăng nhập này đã được sử dụng thì success=false
                    message: 'Số điện thoại đã được sử dụng, vui lòng dùng Số điện thoại khác.'
                }); 
            }
        }
        else {
            res.send({
                success: false,
                message: 'Lỗi truy vấn dữ liệu!'
            });
        }
    });
    TaiKhoan.findOne({BienSoXe: req.body.BienSoXe}, (err, data) =>{
        if(!err)
        {
            if(data.length > 0)
            {
                return res.send({
                    success: false,
                    message: 'Không được dùng xe đã đăng kí trên hệ thống.'
                });
            }
        }
        else{
            return res.send({
                success: false,
                message: 'Lỗi truy vấn dữ liệu'
            });
        }
    });
    var tk = new TaiKhoan({
        TenDangNhap: req.body.TenDangNhap,
        MatKhau: req.body.MatKhau,
        TenHienThi: req.body.TenHienThi,
        DiaChi: req.body.DiaChi,
        SoDienThoai: req.body.SoDienThoai,
        Email: req.body.Email,
        Avatar: req.body.Avatar,
        HinhXe: req.body.HinhXe,
        BiXoa: false,
        MaLoaiTaiKhoan: 2 //mã loại tài khoản là 2
    });
    if(!(tk.TenDangNhap||tk.MatKhau||tk.SoDienThoai||tk.DiaChi||tk.Email||tk.TenHienThi || tk.BienSoXe))
    {
        return res.send({
            success: false,
            message: 'Hãy xem lại những trường đã bỏ trống'
        });     
    }
    //tk.MatKhau = bcrypt.hash(tk.MatKhau, 10);
    tk.save((err, newTK)=>{
        if(err)
        {
            return res.send({
                success: false,
                message: 'Lỗi server'
            });
        }
        else{
            return res.send({
                success: true,
                message: 'Đăng kí thành công',
            });
        }
    });
});

module.exports = router;