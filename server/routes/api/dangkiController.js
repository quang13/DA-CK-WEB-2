const router = require('express').Router();
const TaiKhoan = require('../../models/taikhoan');
//const bcrypt = require('bcrypt');

router.post('/', (req, res) =>{
    if(req.body.TenDangNhap==null || req.body.TenDangNhap==""|| 
        req.body.MatKhau==null || req.body.MatKhau=="" || 
        //req.body.MatKhauConf==null || req.body.MatKhauConf=="" || 
        req.body.SoDienThoai==null || req.body.SoDienThoai=="" || 
        req.body.DiaChi==null || req.body.DiaChi=="" || 
        req.body.Email==null|| req.body.Email=="" || 
        req.body.TenHienThi==null || req.body.TenHienThi==""
        )
    {
        return res.send({
            success: false,
            message: 'Hãy xem lại những trường đã bỏ trống'
        });   
    }
    // TaiKhoan.findOne({TenDangNhap: req.body.TenDangNhap}, (err, data) =>{
    //     if(!err)
    //     {
    //         if(data != null)
    //         {
    //             return res.send({
    //                 success: false,
    //                 message: 'Tên đăng nhập đã tồn tại!',
    //                 data: data
    //             });
    //         }
    //         else return res.send('Dữ liệu kiểm tra không thể hồi đáp kết quả.');
    //     }
    //     else return res.send("Lỗi kiểm tra server: "+err);
    // });
    // // var email = req.body.Email.toLowerCase();
    // // email = email.trim();
    // TaiKhoan.findOne({Email: req.body.Email}, (err, data) =>{
    //     if(!err) {
    //         if(data != null)
    //         {
    //             return res.send('Email đã tồn tại');
    //         }
    //         else return res.send('Dữ liệu kiểm tra không thể hồi đáp kết quả.');
    //     }
    //     else return res.send('Lỗi kiểm tra server');
    // });
    // var sdt = req.body.SoDienThoai.trim();
    // TaiKhoan.findOne({SoDienThoai: sdt}, (err, data) =>{
    //     if(!err) 
    //     {
    //         if(data != null)
    //         {
    //             return res.send('Số điện thoại đăng kí đã tồn tại');
    //         }
    //         else return res.send('Dữ liệu kiểm tra không thể hồi đáp kết quả.');
    //     }
    //     else return res.send('Lỗi kiểm tra server');
    // });
    let user = TaiKhoan.findOne({TenDangNhap: req.body.TenDangNhap});
    if(user){
        return res.status(400).send('Tên đăng nhập đã tồn tại');
    }
    let email = TaiKhoan.findOne({Email: req.body.Email});
    if(email){
        return res.status(400).send("Email đã được đăng kí");
    }
    let sdt = TaiKhoan.findOne({SoDienThoai: req.body.SoDienThoai});
    if(sdt){
        return res.status(400).send('Số điện thoại đã được đăng kí, mời bạn đăng nhập');
    }
    var tk = new TaiKhoan({
        TenDangNhap: req.body.TenDangNhap,
        MatKhau: req.body.MatKhau,
        TenHienThi: req.body.TenHienThi,
        DiaChi: req.body.DiaChi,
        SoDienThoai: req.body.SoDienThoai,
        Email: req.body.Email,
        BiXoa: false,
        MaLoaiTaiKhoan: 1
    });
    //tk.MatKhau = bcrypt.hash(tk.MatKhau, 10);
    tk.save((err, newTK)=>{
        if(err)
        {
            return res.status(500).send({
                success: false,
                message: 'Lỗi server'
            });
        }
        else{
            return res.status(200).send({
                success: true,
                message: 'Đăng kí thành công',
                data: newTK
            });
        }
    });
});

module.exports = router;