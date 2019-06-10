const router = require('express').Router();
const TaiKhoan = require('../../models/taikhoan');
const ObjectID = require('mongoose').Types.ObjectId;

router.get('/', (req, res) =>{
    TaiKhoan.find({MaLoaiTaiKhoan: 0}, (err, data) =>{
        if(!err) {
            res.send(data);
        }
        else {
            console.log('Error in Retriving TaiKhoan: ' +JSON.stringify(err, undefined, 2));
        }
    });
});

//localhost:8080/taikhoan/admin/:id
router.get('/:id', (req, res) =>{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send(`Không tìm thấy dữ liệu với id: ${req.params.id}`);
    }
    TaiKhoan.findById({_id: req.params.id, MaLoaiTaiKhoan: 0}, (err, data) =>{
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
router.post('/update/:id', (err, res) =>{
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
    TaiKhoan.findByIdAndUpdate({_id: req.params.id, MaLoaiTaiKhoan: 0}, {$set: tk}, {new: true}, (err, data) =>{
        if(!err)
        {
            return res.send(data);
        }
        else{
            console.log('Error in TaiKhoan Update: ' +JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('delete/:id', (req, res) =>{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send(`Không tìm thấy dữ liệu với id: ${req.params.id}`);
    }
    TaiKhoan.findByIdAndDelete({_id: req.params.id, MaLoaiTaiKhoan: 0}, (err, data) =>{
        if(!err)
        {
            return res.send(data);
        }
        else{
            console.log('Error in TaiKhoan Delete: ' +JSON.stringify(err, undefined, 2));
        }
    });
});
//insert
router.post('/insert', (req, res) =>{
    // check xem các giá trị đã nhập đã có trong CSDL hay chưa
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
            return res.send({
                success: false,
                message: 'Lỗi truy vấn dữ liệu!'
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
        BiXoa: false,
        MaLoaiTaiKhoan: 0
    });
    if(!(tk.TenDangNhap||tk.MatKhau||tk.SoDienThoai||tk.DiaChi||tk.Email||tk.TenHienThi))
    {
        res.send({
            success: false,
            message: 'Hãy xem lại những trường đã bỏ trống'
        });     
    }
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
                message: 'Đăng kí thành công tài khoản adim',
            });
        }
    });
    res.redirect('/'); // điều hướng về trang chủ
});
module.exports = router;