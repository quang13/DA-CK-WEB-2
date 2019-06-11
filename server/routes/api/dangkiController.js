const router = require('express').Router();
const TaiKhoan = require('../../models/taikhoan');
const bcrypt = require('bcrypt');
// router.post('/', (req, res) =>{
//     TaiKhoan.findOne({TenDangNhap: req.body.TenDangNhap}, (err, data) =>{
//         if(!err) 
//         {
//             if(data.length > 0)
//             {
//                 return res.send({
//                     success: false, // nếu không lỗi tức là có dữ liệu thì tên đăng nhập này đã được sử dụng thì success=false
//                     message: 'Tên đăng nhập đã được sử dụng, vui lòng dùng tên khác.'
//                 }); 
//             } 
//         }
//         else {
//             return res.send({
//                 success: false,
//                 message: 'Lỗi truy vấn dữ liệu!'
//             });
//         }
//     });
//     TaiKhoan.findOne({Email: req.body.Email}, (err, data) =>{
//         if(!err) 
//         {
//             if(data.length > 0)
//             {
//                 return res.send({
//                     success: false, // nếu không lỗi tức là có dữ liệu thì tên đăng nhập này đã được sử dụng thì success=false
//                     message: 'Email đã được sử dụng, vui lòng dùng email khác.'
//                 }); 
//             } 
//         }
//         else {
//             return res.send({
//                 success: false,
//                 message: 'Lỗi truy vấn dữ liệu!'
//             });
//         }
//     });
//     TaiKhoan.findOne({SoDienThoai: req.body.SoDienThoai}, (err, data) =>{
//         if(!err) 
//         {
//             if(data.length > 0)
//             {
//                 return res.send({
//                     success: false, // nếu không lỗi tức là có dữ liệu thì tên đăng nhập này đã được sử dụng thì success=false
//                     message: 'Số điện thoại đã được sử dụng, vui lòng dùng Số điện thoại khác.'
//                 }); 
//             }
//         }
//         else {
//             return res.send({
//                 success: false,
//                 message: 'Lỗi truy vấn dữ liệu!'
//             });
//         }
//     });
    // var tk = new TaiKhoan({
    //     TenDangNhap: req.body.TenDangNhap,
    //     MatKhau: req.body.MatKhau,
    //     TenHienThi: req.body.TenHienThi,
    //     DiaChi: req.body.DiaChi,
    //     SoDienThoai: req.body.SoDienThoai,
    //     Email: req.body.Email,
    //     BiXoa: false,
    //     MaLoaiTaiKhoan: 1
    // });
    // if(!(tk.TenDangNhap||tk.MatKhau||tk.SoDienThoai||tk.DiaChi||tk.Email||tk.TenHienThi))
    // {
    //     return res.send({
    //         success: false,
    //         message: 'Hãy xem lại những trường đã bỏ trống'
    //     });     
    // }
//     tk.MatKhau = bcrypt.hash(tk.MatKhau, 10);
//     tk.save((err, newTK)=>{
//         if(err)
//         {
//             return res.send({
//                 success: false,
//                 message: 'Lỗi server'
//             });
//         }
//         else{
//             return res.send({
//                 success: true,
//                 message: 'Đăng kí thành công',
//             });
//         }
//     });
// });

router.post('/', (req, res) =>{
    if((req.body.TenDangNhap||req.body.MatKhau||req.body.SoDienThoai||req.body.DiaChi||req.body.Email||req.body.TenHienThi)==null)
    {
        return res.send({
            success: false,
            message: 'Hãy xem lại những trường đã bỏ trống'
        });     
    }
    let user = TaiKhoan.findOne({TenDangNhap: req.body.TenDangNhap});
    if(user)
    {
        return res.status(400).send('Tên đăng nhập đã tồn tại!');
    }
    let email = TaiKhoan.findOne({Email: req.body.Email});
    if(email)
    {
        return res.status(400).send('Email đã tồn tại!');
    }
    let phone = TaiKhoan.findOne({SoDienThoai: req.body.SoDienThoai});
    if(phone)
    {
        return res.status(400).send('Số điện thoại đã tồn tại!');
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
    tk.MatKhau = bcrypt.hash(tk.MatKhau, 10);
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